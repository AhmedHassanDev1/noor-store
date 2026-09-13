'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from './cart-provider'
import { useEffect, useState } from 'react'

export default function GlobalLayout({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) {
  const pathname = usePathname()
  const { totalItemsCount } = useCart()
  const [mounted, setMounted] = useState(false)
  const WHATSAPP_PHONE = "201001234567"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Do not show global header/footer in the admin section since it has its own layout shell
  if (pathname.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* Top Announcement Bar */}
      <div className="bg-brand-dark text-brand-100 text-[11px] py-2 px-4 text-center tracking-widest uppercase font-medium flex items-center justify-center gap-3">
        <span>✨ Complimentary Rose Gold Silk Pouch with Orders Over EGP 2000</span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline">Express Worldwide Shipping & WhatsApp Concierge</span>
      </div>

      {/* Global Header */}
      <header className="sticky top-0 z-40 bg-brand-surface/90 backdrop-blur-md border-b border-brand-200/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <Link href="/" className="cursor-pointer flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-rose to-brand-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="font-serif text-white font-bold text-lg tracking-wider">N</span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark block leading-tight">
                NOOR <span className="font-light italic text-brand-600">Store</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-brand-muted uppercase block -mt-0.5">Haute Beauté</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                pathname === '/' || pathname.startsWith('/product/')
                  ? 'text-brand-600 border-b-2 border-brand-600 pb-1' 
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              Home & Catalog
            </Link>
            <Link
              href="/admin"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-1.5 text-brand-muted hover:text-brand-dark`}
            >
              <span className="material-symbols-outlined text-[16px]">shield</span>
              Admin Dashboard
            </Link>
            <Link
              href="/login"
              className={`text-sm font-medium tracking-wide transition-colors duration-200 flex items-center gap-1.5 ${
                pathname === '/login' || pathname === '/signup'
                  ? 'text-brand-600 border-b-2 border-brand-600 pb-1' 
                  : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">person</span>
              {isAuthenticated ? 'Account (Active)' : 'Login'}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-brand-100/70 hover:bg-brand-200 transition-all duration-200 text-brand-dark flex items-center justify-center group"
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform text-brand-600">shopping_bag</span>
              {mounted && totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            <div className="md:hidden flex items-center">
              <Link 
                href={pathname === '/' ? '/cart' : '/'}
                className="text-xs px-3 py-1.5 rounded-lg border border-brand-200 text-brand-muted"
              >
                {pathname === '/' ? 'Cart' : 'Shop'}
              </Link>
            </div>
          </div>

        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-surface border-t border-brand-200 mt-20 pt-14 pb-8 text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
              <div className="w-7 h-7 rounded-full bg-brand-rose flex items-center justify-center text-white font-serif text-sm">N</div>
              <span className="font-serif text-xl font-bold tracking-tight">NOOR <span className="font-light italic text-brand-600">Store</span></span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              Curated luxury cosmetics, clean botanical skincare, and couture pigments created to accentuate your timeless grace.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-dark mb-3">Boutique</h4>
            <ul className="space-y-2 text-xs text-brand-muted">
              <li><Link href="/" className="hover:text-brand-600">All Products</Link></li>
              <li><Link href="/" className="hover:text-brand-600">Skincare Elixirs</Link></li>
              <li><Link href="/" className="hover:text-brand-600">Velvet Lip Pigments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-dark mb-3">Concierge & Orders</h4>
            <p className="text-xs text-brand-muted leading-relaxed mb-3">
              Direct WhatsApp beauty advisors ready to assist with shade matching and bespoke orders.
            </p>
            <a 
              href={`https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Noor%20Store,%20I%20have%20an%20inquiry`} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 hover:underline"
            >
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
              Chat with Concierge
            </a>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-brand-dark mb-3">Portal Access</h4>
            <p className="text-xs text-brand-muted mb-3">Manage inventory, add collections, and update price catalogs.</p>
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg border border-brand-400 text-xs text-brand-600 hover:bg-brand-100 transition inline-block"
            >
              Admin Terminal
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-brand-200/50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-muted">
          <p>© {new Date().getFullYear()} Noor Store Haute Beauté. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with soft rose tones & pure luxury</p>
        </div>
      </footer>
    </div>
  )
}
