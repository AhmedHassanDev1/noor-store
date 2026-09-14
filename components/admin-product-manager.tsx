'use client'

import { useState } from 'react'
import { saveProduct, deleteProduct } from '@/app/admin/actions'
import { translateCategory, adminCategories } from '@/lib/ar'

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  brand: string;
  category: string;
  size: string | null;
  ingredients: string | null;
  how_to_use: string | null;
  tags: string[];
  is_featured: boolean;
  rating: number | null;
  reviews_count: number;
  stock: number;
  active: boolean;
  image_url?: string | null;
}

const emptyForm = {
  name: '',
  category: 'skincare',
  brand: '',
  price: '',
  discount_price: '',
  stock: '10',
  size: '',
  image_url: '',
  tags: '',
  description: '',
  ingredients: '',
  how_to_use: '',
  rating: '',
  reviews_count: '',
  is_featured: false,
}

const inputCls = 'w-full h-12 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(147,51,68,0.25)]'

const textareaCls = 'w-full min-h-24 p-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none transition-all placeholder:text-outline focus:shadow-[0_0_0_2px_rgba(147,51,68,0.25)] resize-y'

const labelCls = 'font-label-md text-label-md text-on-surface-variant uppercase tracking-wider'

export default function AdminProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
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
      addToast('يرجى إدخال اسم المنتج والسعر.', true)
      return
    }

    const payload = {
      name: form.name,
      category: form.category,
      brand: form.brand,
      price: form.price,
      discount_price: form.discount_price || null,
      stock: form.stock,
      size: form.size,
      image_url: form.image_url || null,
      tags: form.tags,
      description: form.description,
      ingredients: form.ingredients || null,
      how_to_use: form.how_to_use || null,
      rating: form.rating || null,
      reviews_count: form.reviews_count === '' ? 0 : form.reviews_count,
      is_featured: form.is_featured,
    }

    try {
      const result = await saveProduct(payload, editingId ?? undefined) as Product
      if (editingId) {
        setProducts(current => current.map(p => p.id === editingId ? result : p))
        addToast('تم حفظ تعديلات المنتج')
      } else {
        setProducts(current => [result, ...current])
        addToast('تمت إضافة المنتج إلى المتجر')
      }
      setForm(emptyForm)
      setEditingId(null)
    } catch(e: any) {
      addToast(e.message, true)
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      category: product.category || 'skincare',
      brand: product.brand || '',
      price: String(product.price ?? ''),
      discount_price: product.discount_price === null || product.discount_price === undefined ? '' : String(product.discount_price),
      stock: String(product.stock ?? 0),
      size: product.size || '',
      image_url: product.image_url || '',
      tags: (product.tags ?? []).join('، '),
      description: product.description || '',
      ingredients: product.ingredients || '',
      how_to_use: product.how_to_use || '',
      rating: product.rating === null || product.rating === undefined ? '' : String(product.rating),
      reviews_count: String(product.reviews_count ?? 0),
      is_featured: !!product.is_featured,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function remove(id: string) {
    if (!window.confirm('هل تريد إزالة هذا المنتج من المتجر؟')) return
    try {
      await deleteProduct(id)
      setProducts(current => current.filter(p => p.id !== id))
      if (editingId === id) cancelEdit()
      addToast('تمت إزالة المنتج من المتجر')
    } catch(e: any) {
      addToast(e.message, true)
    }
  }

  async function toggleStatus(id: string, field: 'active' | 'stock', currentValue: any) {
    const newValue = field === 'stock' ? (currentValue > 0 ? 0 : 10) : !currentValue;
    try {
      const result = await saveProduct({ [field]: newValue }, id) as Product
      setProducts(current => current.map(p => p.id === id ? result : p))
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
            <div className="flex items-center justify-between gap-space-sm mb-space-md">
              <div className="flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[16px]">{editingId ? 'edit' : 'add'}</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">{editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h2>
              </div>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  إلغاء التعديل
                </button>
              )}
            </div>
            <form onSubmit={save} className="space-y-space-md">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                <div className="md:col-span-5 flex flex-col gap-space-xs">
                  <label htmlFor="input-name" className={labelCls}>اسم المنتج</label>
                  <input id="input-name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} type="text" placeholder="مثال: رذاذ الورد المرطب" className={inputCls} />
                </div>
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-category" className={labelCls}>الفئة</label>
                  <select id="input-category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className={`${inputCls} appearance-none cursor-pointer`}>
                    {adminCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-4 flex flex-col gap-space-xs">
                  <label htmlFor="input-brand" className={labelCls}>الماركة</label>
                  <input id="input-brand" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} type="text" placeholder="مثال: متجر نور" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-price" className={labelCls}>السعر (ج.م)</label>
                  <input id="input-price" required value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} type="number" min="0" step="0.01" placeholder="38.00" dir="ltr" className={`${inputCls} text-start`} />
                </div>
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-discount" className={labelCls}>سعر الخصم (اختياري)</label>
                  <input id="input-discount" value={form.discount_price} onChange={(e) => setForm({...form, discount_price: e.target.value})} type="number" min="0" step="0.01" placeholder="30.00" dir="ltr" className={`${inputCls} text-start`} />
                </div>
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-stock" className={labelCls}>المخزون</label>
                  <input id="input-stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} type="number" min="0" step="1" placeholder="10" dir="ltr" className={`${inputCls} text-start`} />
                </div>
                <div className="md:col-span-3 flex flex-col gap-space-xs">
                  <label htmlFor="input-size" className={labelCls}>الحجم / الوزن</label>
                  <input id="input-size" value={form.size} onChange={(e) => setForm({...form, size: e.target.value})} type="text" placeholder="مثال: 50 مل" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                <div className="md:col-span-8 flex flex-col gap-space-xs">
                  <label htmlFor="input-image" className={labelCls}>رابط الصورة</label>
                  <input id="input-image" type="url" value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="https://images.unsplash.com/..." dir="ltr" className={`${inputCls} text-start`} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-space-xs">
                  <label htmlFor="input-rating" className={labelCls}>التقييم (0-5)</label>
                  <input id="input-rating" value={form.rating} onChange={(e) => setForm({...form, rating: e.target.value})} type="number" min="0" max="5" step="0.1" placeholder="4.9" dir="ltr" className={`${inputCls} text-start`} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-space-xs">
                  <label htmlFor="input-reviews" className={labelCls}>عدد التقييمات</label>
                  <input id="input-reviews" value={form.reviews_count} onChange={(e) => setForm({...form, reviews_count: e.target.value})} type="number" min="0" step="1" placeholder="140" dir="ltr" className={`${inputCls} text-start`} />
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <label htmlFor="input-tags" className={labelCls}>الوسوم (افصلي بينها بفاصلة)</label>
                <input id="input-tags" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} type="text" placeholder="مثال: مرطب، ورد، فيتامين سي" className={inputCls} />
              </div>

              <div className="flex flex-col gap-space-xs">
                <label htmlFor="input-description" className={labelCls}>الوصف</label>
                <textarea id="input-description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="وصف جاذب للمنتج يظهر في صفحة التفاصيل وبطاقة المنتج..." className={textareaCls} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label htmlFor="input-ingredients" className={labelCls}>المكونات (اختياري)</label>
                  <textarea id="input-ingredients" value={form.ingredients} onChange={(e) => setForm({...form, ingredients: e.target.value})} placeholder="ماء ورد دمشقي، حمض الهيالورونيك..." className={textareaCls} />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label htmlFor="input-usage" className={labelCls}>طريقة الاستخدام (اختياري)</label>
                  <textarea id="input-usage" value={form.how_to_use} onChange={(e) => setForm({...form, how_to_use: e.target.value})} placeholder="يُرش على بشرة نظيفة صباحاً ومساءً..." className={textareaCls} />
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-space-md pt-space-xs">
                <label className="inline-flex items-center gap-space-xs cursor-pointer select-none">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({...form, is_featured: e.target.checked})} className="w-5 h-5 rounded accent-[rgb(var(--md-sys-color-primary,_147_51_68))] cursor-pointer" />
                  <span className="font-label-md text-label-md text-on-surface">منتج مميز (يحصل على شارة خاصة)</span>
                </label>
                <button type="submit" className="group inline-flex items-center gap-space-xs px-space-lg h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-on-primary-fixed-variant transition-all shadow-[0_4px_14px_rgba(147,51,68,0.25)] active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:rotate-90">{editingId ? 'save' : 'add'}</span>
                  <span>{editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}</span>
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
                    <li key={product.id} className={`flex items-center justify-between p-space-md md:px-space-lg hover:bg-surface-container-low/50 transition-colors duration-200 ${!product.active ? 'opacity-50 grayscale' : ''} ${editingId === product.id ? 'bg-primary/5' : ''}`}>
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
                          <h3 className="font-title-md text-title-md text-on-surface truncate flex items-center gap-space-xs">
                            <span className="truncate">{product.name}</span>
                            {product.is_featured && (
                              <span className="material-symbols-outlined text-[16px] text-amber-500 shrink-0" title="منتج مميز">star</span>
                            )}
                          </h3>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider">{translateCategory(product.category)}</span>
                            {product.size && <span className="text-[10px] bg-surface-container text-on-surface-variant px-1.5 py-0.5 rounded-full">{product.size}</span>}
                            {(product.tags ?? []).slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{tag}</span>
                            ))}
                            {(product.tags ?? []).length > 2 && <span className="text-[10px] text-on-surface-variant">+{product.tags.length - 2}</span>}
                            {!product.active && <span className="text-[9px] bg-outline/20 text-on-surface-variant px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">مخفي</span>}
                            {product.stock === 0 && <span className="text-[9px] bg-error/10 text-error px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">نفد من المخزون</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-lg shrink-0">
                        <div className="flex flex-col items-end">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-medium hidden md:inline-block">
                            {Number(product.discount_price ?? product.price).toFixed(2)} ج.م
                          </span>
                          {product.discount_price !== null && product.discount_price !== undefined && (
                            <span className="font-body-sm text-body-sm text-outline line-through hidden md:inline-block">
                              {Number(product.price).toFixed(2)} ج.م
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1 md:gap-2 ms-2">
                          <button type="button" onClick={() => startEdit(product)} className={`p-2 rounded-lg transition-colors ${editingId === product.id ? 'text-primary bg-primary/10' : 'text-outline hover:text-primary hover:bg-primary/10'}`} title="تعديل المنتج">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button type="button" onClick={() => toggleStatus(product.id, 'active', product.active)} className={`p-2 rounded-lg transition-colors ${product.active ? 'text-primary hover:bg-primary/10' : 'text-outline hover:bg-surface-container-high'}`} title={product.active ? 'إخفاء المنتج' : 'إظهار المنتج'}>
                            <span className="material-symbols-outlined text-[20px]">{product.active ? 'visibility' : 'visibility_off'}</span>
                          </button>
                          <button type="button" onClick={() => toggleStatus(product.id, 'stock', product.stock)} className={`p-2 rounded-lg transition-colors ${product.stock > 0 ? 'text-primary hover:bg-primary/10' : 'text-outline hover:bg-surface-container-high'}`} title={product.stock > 0 ? 'تعليم كـ نفد' : 'تعليم كـ متوفر'}>
                            <span className="material-symbols-outlined text-[20px]">{product.stock > 0 ? 'inventory_2' : 'block'}</span>
                          </button>
                        </div>
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
