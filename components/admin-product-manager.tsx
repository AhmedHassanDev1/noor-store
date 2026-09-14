'use client'

import { useState } from 'react'
import { saveProduct, deleteProduct } from '@/app/admin/actions'
import { translateCategory } from '@/lib/ar'

type Product = {
  id: string;
  name: string;
  description: string;
  price: number | any;
  discount_price: number | any | null;
  brand: string;
  category: string;
  stock: number;
  active: boolean;
  image_url?: string | null;
}

export default function AdminProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState({ name: '', price: '', image_url: '' })
  const [toasts, setToasts] = useState<{id: number, message: string, isError: boolean}[]>([])
  
  const addToast = (message: string, isError = false) => {
    const id = Date.now()
    setToasts(current => [...current, { id, message, isError }])
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id))
    }, 3000)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.price) {
      addToast('يرجى إدخال تفاصيل المنتج بشكل صحيح.', true)
      return
    }
    
    const payload = { 
      name: form.name, 
      price: Number(form.price), 
      image_url: form.image_url || undefined,
      description: 'منتج جديد',
      brand: 'متجر نور',
      category: 'إضافة جديدة',
      stock: 10,
      active: true
    }

    try {
      const result = await saveProduct(payload)
      setProducts(current => [result as any, ...current])
      setForm({ name: '', price: '', image_url: '' })
      addToast('تمت إضافة المنتج إلى المتجر')
    } catch(e: any) {
      addToast(e.message, true)
    }
  }

  async function remove(id: string) {
    if (!window.confirm('هل تريد إزالة هذا المنتج من المتجر؟')) return
    try {
      await deleteProduct(id)
      setProducts(current => current.filter(p => p.id !== id))
      addToast('تمت إزالة المنتج من المتجر')
    } catch(e: any) {
      addToast(e.message, true)
    }
  }

  async function toggleStatus(id: string, field: 'active' | 'stock', currentValue: any) {
    const newValue = field === 'stock' ? (currentValue > 0 ? 0 : 10) : !currentValue;
    try {
      await saveProduct({ [field]: newValue }, id)
      setProducts(current => current.map(p => p.id === id ? { ...p, [field]: newValue } : p))
      addToast(
        field === 'active'
          ? (newValue ? 'المنتج ظاهر الآن' : 'المنتج مخفي الآن')
          : (newValue > 0 ? 'المنتج متوفر في المخزون' : 'المنتج نفد من المخزون')
      )
    } catch(e: any) {
      addToast(e.message, true)
    }
  }

  return (
    <>
      <div className="fixed top-24 end-6 z-50 flex flex-col gap-space-xs pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto flex items-center gap-space-xs px-space-md py-space-xs rounded-xl shadow-lg transition-all duration-300 ${toast.isError ? 'bg-error text-on-error' : 'bg-surface-container-lowest text-on-surface shadow-[0_10px_30px_-5px_rgba(143,58,72,0.15)]'}`}>
            <span className={`material-symbols-outlined text-[18px] ${toast.isError ? 'text-on-error' : 'text-primary'}`}>{toast.isError ? 'info' : 'check_circle'}</span>
            <span className="font-body-md text-body-md">{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto py-space-xl px-margin-mobile md:px-space-md">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
          <div className="space-y-space-xs">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              مخزون المتجر
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">إدارة المنتجات</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              أضيفي منتجات جديدة إلى المتجر أو أديري المخزون الحالي بدقة.
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-full shadow-[0_4px_20px_-4px_rgba(143,58,72,0.06)] self-start md:self-auto">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">المنتجات النشطة:</span>
            <span className="font-title-md text-title-md text-primary font-semibold">{products.length}</span>
          </div>
        </header>

        <div className="space-y-space-xl">
          <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-[0_8px_30px_-4px_rgba(143,58,72,0.05)]">
            <div className="flex items-center gap-space-xs mb-space-md">
              <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">add</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">إضافة منتج جديد</h2>
            </div>
            <form onSubmit={save} className="space-y-space-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                <div className="md:col-span-5 flex flex-col gap-space-xs">
                  <label htmlFor="input-name" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">اسم المنتج</label>
                  <input id="input-name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} type="text" placeholder="مثال: رذاذ الورد المرطب" className="w-full h-12 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(147,51,68,0.25)] focus:bg-surface-container-low/30" />
                </div>
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-price" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">السعر (ج.م)</label>
                  <div className="relative flex items-center">
                    <span className="absolute start-4 font-body-md text-body-md text-on-surface-variant select-none">ج.م</span>
                    <input id="input-price" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} type="number" min="0" step="0.01" placeholder="38.00" dir="ltr" className="w-full h-12 ps-12 pe-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(147,51,68,0.25)] focus:bg-surface-container-low/30 text-start" />
                  </div>
                </div>
                <div className="md:col-span-4 flex flex-col gap-space-xs">
                  <label htmlFor="input-image" className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">رابط الصورة</label>
                  <input id="input-image" type="url" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://images.unsplash.com/..." dir="ltr" className="w-full h-12 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(147,51,68,0.25)] focus:bg-surface-container-low/30 text-start" />
                </div>
              </div>
              <div className="flex items-center justify-end pt-space-xs">
                <button type="submit" className="group inline-flex items-center gap-space-xs px-space-lg h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-on-primary-fixed-variant transition-all shadow-[0_4px_14px_rgba(147,51,68,0.25)] active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-90">add</span>
                  <span>إضافة المنتج</span>
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">المنتجات الحالية</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">راجعي وأديري جميع المنتجات المعروضة في متجر نور.</p>
            </div>
            
            <div className="bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_-4px_rgba(143,58,72,0.05)] overflow-hidden">
              {products.length === 0 ? (
                <div className="flex p-space-xl text-center flex-col items-center justify-center space-y-space-xs">
                  <span className="material-symbols-outlined text-[36px] text-outline">inventory_2</span>
                  <p className="font-title-md text-title-md text-on-surface">لا توجد منتجات نشطة حالياً</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">استخدمي النموذج أعلاه لإضافة أول منتج إلى المتجر.</p>
                </div>
              ) : (
                <ul className="divide-y-0">
                  {products.map(product => (
                    <li key={product.id} className={`flex items-center justify-between p-space-md md:px-space-lg hover:bg-surface-container-low/50 transition-colors duration-200 ${!product.active ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden shrink-0 shadow-sm relative">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                                <span className="material-symbols-outlined text-outline">image</span>
                            </div>
                          )}
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="text-[10px] text-white font-bold tracking-wider">نفد</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex flex-col">
                          <h3 className="font-title-md text-title-md text-on-surface truncate">{product.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider">{translateCategory(product.category)}</span>
                            {!product.active && <span className="text-[9px] bg-outline/20 text-on-surface-variant px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">مخفي</span>}
                            {product.stock === 0 && <span className="text-[9px] bg-error/10 text-error px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">نفد من المخزون</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-lg shrink-0">
                        <div className="flex gap-1 md:gap-2 ms-2">
                          <button type="button" onClick={() => toggleStatus(product.id, 'active', product.active)} className={`p-2 rounded-lg transition-colors ${product.active ? 'text-primary hover:bg-primary/10' : 'text-outline hover:bg-surface-container-high'}`} title={product.active ? 'إخفاء المنتج' : 'إظهار المنتج'}>
                            <span className="material-symbols-outlined text-[20px]">{product.active ? 'visibility' : 'visibility_off'}</span>
                          </button>
                          <button type="button" onClick={() => toggleStatus(product.id, 'stock', product.stock)} className={`p-2 rounded-lg transition-colors ${product.stock > 0 ? 'text-primary hover:bg-primary/10' : 'text-outline hover:bg-surface-container-high'}`} title={product.stock > 0 ? 'تعليم كـ نفد' : 'تعليم كـ متوفر'}>
                            <span className="material-symbols-outlined text-[20px]">{product.stock > 0 ? 'inventory_2' : 'block'}</span>
                          </button>
                        </div>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-medium hidden md:inline-block">{Number(product.price).toFixed(2)} ج.م</span>
                        <button type="button" onClick={() => remove(product.id)} className="p-2 rounded-lg text-outline hover:text-error hover:bg-error-container/40 transition-colors ms-2" title="حذف المنتج">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
