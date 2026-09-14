'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from './cart-provider'
import { translateCategory } from '@/lib/ar'

export default function ProductDetailsClient({ product }: { product: any }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const WHATSAPP_PHONE = "201007294481"

  const handleOrderSingleViaWhatsApp = () => {
    const text = `مرحباً متجر نور، أود طلب: ${product.name} (السعر: ${Number(product.price).toFixed(2)} ج.م)`
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 text-xs text-brand-muted mb-8">
        <button onClick={() => router.push('/')} className="hover:text-brand-600 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] rtl:rotate-180">arrow_back</span> العودة للمجموعة
        </button>
        <span>/</span>
        <span>{translateCategory(product.category || 'beauty')}</span>
        <span>/</span>
        <span className="text-brand-dark font-medium truncate max-w-xs">{product.name}</span>
      </div>

      <div className="bg-brand-surface rounded-3xl border border-brand-200 shadow-soft p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden bg-brand-cream border border-brand-200 aspect-square shadow-inner">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-600 shadow-sm">
                {translateCategory(product.category || 'beauty')}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="border-2 border-brand-600 rounded-xl overflow-hidden aspect-video cursor-pointer">
                <img src={product.image_url || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'} alt="صورة مصغرة 1" className="w-full h-full object-cover" />
              </div>
              <div className="border border-brand-200 rounded-xl overflow-hidden aspect-video bg-brand-cream flex items-center justify-center text-xs text-brand-muted opacity-75">
                <span>تكبير الملمس</span>
              </div>
              <div className="border border-brand-200 rounded-xl overflow-hidden aspect-video bg-brand-cream flex items-center justify-center text-xs text-brand-muted opacity-75">
                <span>عينة على البشرة</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-brand-dark">4.9</span>
                <span className="text-xs text-brand-muted">(140 تقييم موثّق)</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-4">
                {product.name}
              </h1>
              <p className="font-serif text-2xl text-brand-600 mb-6">{Number(product.price).toFixed(2)} ج.م</p>
              
              <div className="prose prose-sm text-brand-muted">
                <p className="leading-relaxed">
                  {product.description || 'اختبري جوهر الفخامة. مصنوع يدوياً بمكونات نباتية لتغذية بشرتك ورفع جمالك.'}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-brand-200">
              <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                <div className="w-full sm:w-auto">
                  <span className="text-[10px] uppercase tracking-widest text-brand-muted mb-2 block">الكمية</span>
                  <div className="flex items-center border border-brand-200 rounded-full h-12 bg-brand-surface w-32">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-600 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <span className="flex-1 text-center text-sm font-semibold text-brand-dark">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-600 transition"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>

                <button 
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product, quantity)}
                  className={`w-full sm:flex-1 h-12 rounded-full font-medium text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                      : 'bg-brand-dark hover:bg-brand-600 text-white hover:shadow-floating active:scale-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {product.stock === 0 ? 'inventory_2' : 'shopping_bag'}
                  </span>
                  {product.stock === 0 ? 'نفد من المخزون' : 'أضف لحقيبة التسوق'}
                </button>
              </div>

              <div className="mt-4">
                <button 
                  disabled={product.stock === 0}
                  onClick={handleOrderSingleViaWhatsApp}
                  className={`w-full h-12 border rounded-full font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                    product.stock === 0
                      ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-brand-100 hover:bg-brand-200 border-brand-200 text-brand-600'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">
                    {product.stock === 0 ? 'block' : 'chat'}
                  </span>
                  {product.stock === 0 ? 'غير متوفر عبر واتساب' : 'طلب سريع عبر واتساب'}
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <span className="material-symbols-outlined text-[16px] text-brand-400">local_shipping</span>
                  شحن مجاني
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <span className="material-symbols-outlined text-[16px] text-brand-400">package_2</span>
                  تغليف فاخر
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
