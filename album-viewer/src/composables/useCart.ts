import { ref, computed, reactive } from 'vue'
import type { Album } from '../types/album'
import type { CartItem, CartState } from '../types/cart'

const CART_STORAGE_KEY = 'album-cart'

// Global cart state
const cartState = reactive<CartState>({
  items: [],
  isOpen: false
})

// Load cart from localStorage on initialization
const loadCartFromStorage = (): void => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Restore Date objects
      cartState.items = parsed.map((item: any) => ({
        ...item,
        addedAt: new Date(item.addedAt)
      }))
    }
  } catch (error) {
    console.warn('Failed to load cart from storage:', error)
    cartState.items = []
  }
}

// Save cart to localStorage
const saveCartToStorage = (): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items))
  } catch (error) {
    console.warn('Failed to save cart to storage:', error)
  }
}

// Initialize cart from storage
loadCartFromStorage()

export const useCart = () => {
  // Computed properties
  const cartItems = computed(() => cartState.items)
  const cartCount = computed(() => cartState.items.reduce((total, item) => total + item.quantity, 0))
  const cartTotal = computed(() => 
    cartState.items.reduce((total, item) => total + (item.album.price * item.quantity), 0)
  )
  const isCartOpen = computed(() => cartState.isOpen)

  // Actions
  const addToCart = (album: Album): void => {
    const existingItemIndex = cartState.items.findIndex(item => item.album.id === album.id)
    
    if (existingItemIndex >= 0) {
      // If album already exists, increment quantity
      cartState.items[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        album,
        quantity: 1,
        addedAt: new Date()
      }
      cartState.items.push(newItem)
    }
    
    saveCartToStorage()
  }

  const removeFromCart = (albumId: number): void => {
    const index = cartState.items.findIndex(item => item.album.id === albumId)
    if (index >= 0) {
      cartState.items.splice(index, 1)
      saveCartToStorage()
    }
  }

  const updateQuantity = (albumId: number, quantity: number): void => {
    const item = cartState.items.find(item => item.album.id === albumId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(albumId)
      } else {
        item.quantity = quantity
        saveCartToStorage()
      }
    }
  }

  const clearCart = (): void => {
    cartState.items = []
    saveCartToStorage()
  }

  const isInCart = (albumId: number): boolean => {
    return cartState.items.some(item => item.album.id === albumId)
  }

  const getItemQuantity = (albumId: number): number => {
    const item = cartState.items.find(item => item.album.id === albumId)
    return item?.quantity || 0
  }

  const toggleCart = (): void => {
    cartState.isOpen = !cartState.isOpen
  }

  const closeCart = (): void => {
    cartState.isOpen = false
  }

  const openCart = (): void => {
    cartState.isOpen = true
  }

  return {
    // State
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    toggleCart,
    closeCart,
    openCart
  }
}