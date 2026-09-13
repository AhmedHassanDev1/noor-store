import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetailsClient from '@/components/product-details-client'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })
  
  if (!product) return notFound()

  const serialized = { ...product, price: Number(product.price) }
  return <ProductDetailsClient product={serialized} />
}
