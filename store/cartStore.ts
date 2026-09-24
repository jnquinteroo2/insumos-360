import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  stock: number
  colors?: string | null
  size?: string | null
}

export interface CartItem extends Product {
  quantity: number
  selectedColor: string
  cartItemId: string 
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Product, selectedColor: string) => void
  removeFromCart: (cartItemId: string) => void
  decrementQuantity: (cartItemId: string) => void
  clearCart: () => void
  getTotal: () => number
  syncCart: (products: Product[]) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
        addToCart: (product, selectedColor) => {
        const cart = get().cart;
        const finalColor = selectedColor || (product.colors ? product.colors.split(',')[0].trim() : 'Único');
        const cartItemId = `${product.id}-${finalColor}`;
        
        const existingItem = cart.find(item => item.cartItemId === cartItemId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
            set({ cart: cart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item) });
            }
        } else {
            set({ cart: [...cart, { ...product, quantity: 1, selectedColor: finalColor, cartItemId }] });
        }
        },
      
      decrementQuantity: (cartItemId) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.cartItemId === cartItemId)
        if (existingItem && existingItem.quantity > 1) {
          set({ cart: cart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item) })
        } else {
          set({ cart: get().cart.filter(item => item.cartItemId !== cartItemId) })
        }
      },
      
      removeFromCart: (cartItemId) => {
        set({ cart: get().cart.filter(item => item.cartItemId !== cartItemId) })
      },
      
      clearCart: () => set({ cart: [] }),

      syncCart: (products) => {
        const byId = new Map(products.map((p) => [p.id, p]))
        const cart = get().cart
        const synced = cart
          .map((item) => {
            const fresh = byId.get(item.id)
            if (!fresh || fresh.stock <= 0) return null
            const quantity = Math.min(item.quantity, fresh.stock)
            return { ...item, ...fresh, quantity, selectedColor: item.selectedColor, cartItemId: item.cartItemId }
          })
          .filter((item): item is CartItem => item !== null)
        const changed =
          synced.length !== cart.length ||
          synced.some((item, i) => {
            const prev = cart[i]
            return (
              item.price !== prev.price ||
              item.quantity !== prev.quantity ||
              item.image !== prev.image ||
              item.name !== prev.name ||
              item.stock !== prev.stock
            )
          })
        if (changed) set({ cart: synced })
      },
      
      getTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: 'comfort-360-cart',
    }
  )
)