import Link from 'next/link'
import AdminProductManager from '@/components/admin-product-manager'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prisma'

export default async function AdminPage(){
  const session = await getServerSession(authOptions)
  const role = (session?.user as any)?.role

  if(!session?.user || role !== 'admin') {
    redirect('/login');
  }

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-low/90 backdrop-blur-md shadow-[0_1px_8px_rgba(143,58,72,0.04)]">
        <div className="h-20 w-full px-margin-mobile md:px-space-lg lg:px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-lg">
            <Link href="/" className="group flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">NOOR <span className="font-headline-sm text-headline-sm text-primary italic font-normal">Store</span></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-[0.2em] -mt-1">Haute Beauté</span>
            </Link>
            <div className="hidden md:block h-6 w-[1px] bg-outline-variant/50"></div>
            <nav className="flex items-center gap-space-xs">
              <Link href="/" className="px-space-sm py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all">Storefront</Link>
              <Link href="/admin" aria-current="page" className="px-space-sm py-space-xs rounded-full transition-all bg-surface-container-highest text-primary font-semibold shadow-sm">Products Management</Link>
            </nav>
          </div>
          <div className="flex items-center gap-space-md">
            <Link href="/api/auth/signout" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-space-xs px-space-sm rounded-lg hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">logout</span>
              <span className="hidden sm:inline">Exit</span>
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <AdminProductManager initialProducts={products.map(p => ({ ...p, price: Number(p.price) }))} />
        </div>
      </main>

      <footer className="w-full bg-surface-container-low shadow-[0_-1px_6px_rgba(143,58,72,0.03)] mt-space-xl py-space-lg">
        <div className="w-full px-margin-mobile md:px-space-lg lg:px-margin flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-primary">NOOR</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">— Admin Atelier</span>
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant">© 2026 NOOR Store Haute Beauté. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
