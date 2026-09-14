'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

function toOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}

// يقبل الحقول المسموح بها فقط ويحوّلها للأنواع الصحيحة قبل وصولها لقاعدة البيانات
function sanitizeProductPayload(raw: any) {
  const data: Record<string, unknown> = {}

  if (typeof raw?.name === 'string' && raw.name.trim() !== '') data.name = raw.name.trim()
  if (typeof raw?.description === 'string') data.description = raw.description.trim()
  if (typeof raw?.brand === 'string') data.brand = raw.brand.trim()
  if (typeof raw?.category === 'string') data.category = raw.category.trim()

  if (raw?.price !== undefined && raw?.price !== null && raw?.price !== '') {
    const price = Number(raw.price)
    if (Number.isNaN(price) || price < 0) throw new Error('السعر غير صالح.')
    data.price = price
  }

  if (raw?.discount_price === undefined || raw?.discount_price === null || raw?.discount_price === '') {
    if ('discount_price' in raw) data.discount_price = null
  } else {
    const discount = Number(raw.discount_price)
    if (Number.isNaN(discount) || discount < 0) throw new Error('سعر الخصم غير صالح.')
    data.discount_price = discount
  }

  // حقول نصية طويلة اختيارية: القيمة الفارغة تُحفظ كـ null
  for (const key of ['size', 'ingredients', 'how_to_use'] as const) {
    if (raw?.[key] !== undefined) data[key] = toOptionalString(raw[key])
  }

  if (raw?.image_url !== undefined) data.image_url = toOptionalString(raw.image_url)

  if (raw?.tags !== undefined) {
    let tags: string[]
    if (Array.isArray(raw.tags)) {
      tags = raw.tags.map(String)
    } else if (typeof raw.tags === 'string') {
      tags = raw.tags.split(/[,،]/)
    } else {
      tags = []
    }
    data.tags = Array.from(new Set(tags.map(t => t.trim()).filter(Boolean))).slice(0, 12)
  }

  if (raw?.stock !== undefined && raw?.stock !== null && raw?.stock !== '') {
    const stock = Math.trunc(Number(raw.stock))
    if (Number.isNaN(stock) || stock < 0) throw new Error('كمية المخزون غير صالحة.')
    data.stock = stock
  }

  if (raw?.active !== undefined) data.active = Boolean(raw.active)
  if (raw?.is_featured !== undefined) data.is_featured = Boolean(raw.is_featured)

  if (raw?.rating === undefined || raw?.rating === null || raw?.rating === '') {
    if ('rating' in raw) data.rating = null
  } else {
    const rating = Number(raw.rating)
    if (Number.isNaN(rating)) throw new Error('التقييم غير صالح.')
    data.rating = Math.min(5, Math.max(0, rating))
  }

  if (raw?.reviews_count !== undefined && raw?.reviews_count !== null && raw?.reviews_count !== '') {
    const reviews = Math.trunc(Number(raw.reviews_count))
    if (Number.isNaN(reviews) || reviews < 0) throw new Error('عدد التقييمات غير صالح.')
    data.reviews_count = reviews
  }

  if (data.discount_price !== null && data.discount_price !== undefined
    && data.price !== undefined && Number(data.discount_price) >= Number(data.price)) {
    throw new Error('سعر الخصم يجب أن يكون أقل من السعر الأصلي.')
  }

  if (Object.keys(data).length === 0) throw new Error('لا توجد بيانات صالحة للحفظ.')

  return data
}

export async function saveProduct(payload: any, editingId?: string) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const data = sanitizeProductPayload(payload)

  if (editingId) {
    return await prisma.product.update({
      where: { id: editingId },
      data
    })
  } else {
    if (!data.name || data.price === undefined) {
      throw new Error('اسم المنتج والسعر مطلوبان.')
    }
    return await prisma.product.create({
      data: data as { name: string; price: number }
    })
  }
}

export async function deleteProduct(id: string) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  await prisma.product.delete({
    where: { id }
  })
}
