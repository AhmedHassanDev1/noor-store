import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetailsClient from '@/components/product-details-client'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) return notFound()

  const serialized = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    stock: product.stock,
    image_url: product.image_url,
  }

  return <ProductDetailsClient product={serialized} />
}
