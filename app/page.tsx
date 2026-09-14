import StorefrontClient from '@/components/storefront-client'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' }
  })
  const serialized = products.map(p => ({ ...p, price: Number(p.price) }))
  return <StorefrontClient products={serialized} />
}
