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
      
      getTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }),
    {
      name: 'comfort-360-cart',
    }
  )
)