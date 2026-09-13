'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from './cart-provider'

export default function StorefrontClient({ products }: { products: any[] }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Skincare", "Lips", "Eyes"]
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const WHATSAPP_PHONE = "201001234567"

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-cream to-brand-cream py-14 lg:py-20 border-b border-brand-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-200 shadow-sm mb-4">
                <span className="material-symbols-outlined text-[14px] text-brand-600">sparkles</span>
                <span className="text-xs tracking-wider uppercase font-semibold text-brand-600">New Spring Haute Collection</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-dark leading-[1.15] mb-6">
                Illuminate your aura with <span className="italic font-normal text-brand-600">timeless grace.</span>
              </h1>
              <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto lg:mx-0 font-light leading-relaxed mb-8">
                Discover Noor Store’s botanical infusions and velvety formulas designed to nourish, sculpt, and elevate your daily beauty ritual.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#collection-grid"
                  className="px-7 py-3.5 rounded-full bg-brand-dark hover:bg-brand-600 text-white text-sm font-medium tracking-wide shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Explore The Collection
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=Hello%20Noor%20Store,%20I%20would%20like%20a%20personal%20beauty%20consultation`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full bg-brand-surface border border-brand-200 hover:border-brand-600 text-brand-600 text-sm font-medium shadow-sm transition flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">chat</span>
                  WhatsApp Beauty Advisor
                </a>
              </div>
            </div>

            {/* Hero Feature Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" 
                  alt="Noor Store Beauty Atmosphere"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-brand-200">The Signature Glow</span>
                  <p className="font-serif text-lg font-semibold">Infused with Damascus Rose & 24K Botanical Elixir</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-surface p-3 rounded-2xl shadow-xl border border-brand-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-brand-dark uppercase tracking-wider">Clean Certified</p>
                  <p className="text-[10px] text-brand-muted">Cruelty-free & Vegan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section id="collection-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-brand-200/70 gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-600">Curated Selection</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">Our Beauty Essentials</h2>
            <p className="text-sm text-brand-muted mt-1">Explore {filteredProducts.length} handcrafted formulations</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-brand-surface text-brand-muted border border-brand-200 hover:bg-brand-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="bg-brand-surface rounded-2xl overflow-hidden border border-brand-200/70 shadow-card hover:shadow-floating hover:border-brand-400 transition-all duration-300 flex flex-col group"
            >
              <div 
                onClick={() => router.push(`/product/${product.id}`)}
                className="relative w-full h-72 overflow-hidden bg-brand-100/40 cursor-pointer"
              >
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-brand-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-brand-600 shadow-sm">
                  EGP {Number(product.price).toFixed(2)}
                </div>
                {product.category && (
                  <div className="absolute top-3 left-3 bg-brand-dark/80 text-white px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase font-medium">
                    {product.category}
                  </div>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <span className="bg-brand-dark text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-0">
                  <span className="bg-white text-brand-dark text-xs font-semibold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-brand-600">visibility</span>
                    Inspect Details
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <span className="material-symbols-outlined text-[14px]">star</span>
                    <span className="text-xs font-semibold text-brand-dark">4.9</span>
                    <span className="text-[11px] text-brand-muted">(85 reviews)</span>
                  </div>
                  <h3 
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="font-serif text-lg font-bold text-brand-dark hover:text-brand-600 cursor-pointer transition line-clamp-1"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 line-clamp-2 leading-relaxed">
                    {product.description || 'A beautiful addition to your daily routine.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-200/50 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Price</span>
                    <span className="font-serif text-xl font-bold text-brand-dark">
                      EGP {Number(product.price).toFixed(2)}
                    </span>
                  </div>

                  <button
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product, 1)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95 ${
                      product.stock === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-brand-100 hover:bg-brand-600 text-brand-600 hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {product.stock === 0 ? 'inventory_2' : 'add'}
                    </span>
                    {product.stock === 0 ? 'Unavailable' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-brand-surface rounded-2xl border border-dashed border-brand-200">
            <span className="material-symbols-outlined text-[48px] text-brand-400 mb-3">inventory_2</span>
            <h3 className="font-serif text-xl font-bold text-brand-dark">No products in this category</h3>
            <p className="text-sm text-brand-muted mt-1">Please select another category or check back later.</p>
          </div>
        )}

        {/* Brand Value Pillars */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-200 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-100 text-brand-600">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-dark">Dermatologist Verified</h4>
              <p className="text-xs text-brand-muted mt-1">Hypoallergenic and free from parabens, sulfates, and synthetic fragrances.</p>
            </div>
          </div>

          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-200 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-100 text-brand-600">
              <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-dark">Instant WhatsApp Orders</h4>
              <p className="text-xs text-brand-muted mt-1">Order individual items or entire carts with automatic personalized text formatting.</p>
            </div>
          </div>

          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-200 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-brand-100 text-brand-600">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-serif font-bold text-brand-dark">Artisanal Formulation</h4>
              <p className="text-xs text-brand-muted mt-1">Blended with small-batch botanicals and micro-milled pigments for effortless wear.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
