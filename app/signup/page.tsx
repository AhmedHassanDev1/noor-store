'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'حدث خطأ ما')
      }

      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 sm:py-20 min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <div className="bg-brand-100/60 p-1 rounded-full flex gap-1 border border-brand-200/50 shadow-inner">
            <Link href="/login" className="px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 text-brand-muted hover:text-brand-dark">
              تسجيل الدخول
            </Link>
            <Link href="/signup" className="px-5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-brand-dark shadow-sm">
              إنشاء حساب
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_4px_25px_-4px_rgba(178,75,91,0.06),0_1px_3px_rgba(0,0,0,0.03)] border border-brand-100/80 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl sm:text-3xl text-brand-dark tracking-tight mb-2">إنشاء حساب</h1>
            <p className="text-xs sm:text-sm text-brand-muted font-light">انضمي إلى متجر نور لطقوس جمال حصرية ومزايا خاصة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-xs font-medium uppercase tracking-wider text-brand-muted mb-1.5">
                الاسم الكامل
              </label>
              <input 
                type="text" 
                id="signup-name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                placeholder="مثال: ليلى أحمد"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-brand-dark placeholder:text-gray-400 bg-[#FCFBFA] transition"
              />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-xs font-medium uppercase tracking-wider text-brand-muted mb-1.5">
                البريد الإلكتروني
              </label>
              <input 
                type="email" 
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                placeholder="name@example.com"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-brand-dark placeholder:text-gray-400 bg-[#FCFBFA] transition text-start"
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-xs font-medium uppercase tracking-wider text-brand-muted mb-1.5">
                كلمة المرور
              </label>
              <input 
                type="password" 
                id="signup-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                placeholder="8 أحرف على الأقل"
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 outline-none text-sm text-brand-dark placeholder:text-gray-400 bg-[#FCFBFA] transition text-start"
              />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-medium text-sm transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <span>{isLoading ? 'جاري الإنشاء...' : 'إنشاء حساب'}</span>
              {!isLoading && <span className="material-symbols-outlined text-[16px] transition-transform group-hover:scale-110">check</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-50 text-center">
            <p className="text-xs sm:text-sm text-brand-muted">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-brand-600 hover:text-brand-800 font-medium underline decoration-brand-200 underline-offset-2 hover:decoration-brand-600 transition">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
