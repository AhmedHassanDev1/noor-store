'use client'

import { useCart } from '@/components/cart-provider'
import { useRouter } from 'next/navigation'
import { translateCategory } from '@/lib/ar'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, totalItemsCount } = useCart()
  const router = useRouter()
  const WHATSAPP_PHONE = "201001234567"

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return
    const itemsList = cart.map(i => `• ${i.name} ×${i.quantity} (${(Number(i.price) * i.quantity).toFixed(2)} ج.م)`).join('\n')
    const text = `مرحباً متجر نور، أود طلب المنتجات التالية من سلتي:\n\n${itemsList}\n\n*إجمالي الطلب:* ${cartTotal.toFixed(2)} ج.م\n\nيرجى تزويدي بتفاصيل الدفع والتوصيل. شكراً!`
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const itemWord = totalItemsCount === 1 ? 'منتج' : totalItemsCount === 2 ? 'منتجان' : 'منتجات'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">حقيبة التسوق</h1>
          <p className="text-sm text-brand-muted mt-1">{totalItemsCount} {itemWord} مختارة لك.</p>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-medium text-brand-600 hover:text-brand-dark transition underline-offset-4 hover:underline"
        >
          متابعة التصفح
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="bg-brand-surface rounded-3xl border border-brand-200 p-12 text-center shadow-soft">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[28px] text-brand-400">shopping_bag</span>
          </div>
          <h2 className="font-serif text-xl font-bold text-brand-dark mb-2">حقيبتك فارغة</h2>
          <p className="text-sm text-brand-muted mb-6">اكتشفي أحدث تركيباتنا وأضيفي المفضلة لديك هنا.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-full bg-brand-dark text-white text-sm font-medium hover:bg-brand-600 transition"
          >
            استكشفي المجموعة
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-brand-surface rounded-2xl border border-brand-200 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm hover:shadow-md transition">
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-brand-cream border border-brand-100 shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brand-600 font-bold">{translateCategory(item.category)}</span>
                      <h3 className="font-serif text-lg font-bold text-brand-dark leading-tight mt-1">{item.name}</h3>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-brand-muted hover:text-red-500 transition"
                      aria-label="إزالة المنتج"
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-6 sm:mt-auto">
                    <div className="flex items-center border border-brand-200 rounded-full h-10 bg-brand-cream">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-600 transition"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-brand-dark">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-full flex items-center justify-center text-brand-muted hover:text-brand-600 transition"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    
                    <span className="font-serif text-lg font-bold text-brand-dark">
                      {(Number(item.price) * item.quantity).toFixed(2)} ج.م
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-brand-surface rounded-3xl border border-brand-200 p-6 sm:p-8 shadow-soft sticky top-28">
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-6">ملخص الطلب</h3>
              
              <div className="space-y-4 text-sm mb-6 border-b border-brand-200 pb-6">
                <div className="flex justify-between text-brand-muted">
                  <span>المجموع الفرعي ({totalItemsCount} منتج)</span>
                  <span className="text-brand-dark font-medium">{cartTotal.toFixed(2)} ج.م</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>الشحن</span>
                  <span className="text-brand-600 font-medium">مجاني</span>
                </div>
                <div className="flex justify-between text-brand-muted">
                  <span>الضرائب</span>
                  <span className="text-brand-dark font-medium">تُحسب عند الدفع</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl font-bold text-brand-dark">الإجمالي</span>
                <span className="font-serif text-2xl font-bold text-brand-600">{cartTotal.toFixed(2)} ج.م</span>
              </div>

              <button 
                onClick={handleCheckoutWhatsApp}
                className="w-full h-14 bg-brand-dark hover:bg-brand-600 text-white rounded-full font-medium text-sm tracking-wide transition-all shadow-lg hover:shadow-floating active:scale-95 flex items-center justify-center gap-2 mb-3"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                إتمام الطلب عبر واتساب
              </button>
              
              <p className="text-[11px] text-brand-muted text-center leading-relaxed">
                بالمتابعة، سيتم تحويلك إلى واتساب لإتمام تفاصيل الدفع بأمان مع مستشاري الجمال لدينا.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
