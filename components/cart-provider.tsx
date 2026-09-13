'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  category: string;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  totalItemsCount: number;
  cartTotal: number;
  toast: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState<string | null>(null)
  
  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('noor-cart')
      if (stored) setCart(JSON.parse(stored))
    } catch (e) {}
  }, [])
  
  // Save to local storage
  useEffect(() => {
    localStorage.setItem('noor-cart', JSON.stringify(cart))
  }, [cart])

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2800)
  }

  const addToCart = (product: any, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        return [...prev, { 
          id: product.id, 
          name: product.name, 
          price: Number(product.price), 
          image_url: product.image_url || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
          category: product.category,
          quantity 
        }]
      }
    })
    showToast(`Added "${product.name}" to your shopping bag`)
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as CartItem[]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId))
    showToast("Item removed from your bag")
  }

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      totalItemsCount,
      cartTotal,
      toast
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 toast-anim">
          <div className="bg-brand-dark text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-brand-200/20">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping"></span>
            <span className="text-sm font-medium">{toast}</span>
            <span className="material-symbols-outlined text-[16px] text-brand-400">sparkles</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
