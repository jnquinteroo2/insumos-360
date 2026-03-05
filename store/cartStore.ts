import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotal: () => number
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id)
        if (existingItem) {
          set({ cart: cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },
      
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },
      
      clearCart: () => set({ cart: [] }),
      
      getTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: 'comfort-360-cart',
    }
  )
)