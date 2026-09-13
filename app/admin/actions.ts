'use server'

import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function saveProduct(payload: any, editingId?: string) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  if (editingId) {
    return await prisma.product.update({
      where: { id: editingId },
      data: payload
    })
  } else {
    return await prisma.product.create({
      data: payload
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
