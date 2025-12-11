<template>
  <div v-if="isCartOpen" class="cart-dropdown">
    <!-- Backdrop -->
    <div class="cart-backdrop" @click="closeCart"></div>
    
    <!-- Cart Content -->
    <div class="cart-content" role="dialog" :aria-label="t.cart.title">
      <!-- Header -->
      <div class="cart-header">
        <h3 class="cart-title">{{ t.cart.title }}</h3>
        <button 
          @click="closeCart" 
          class="close-btn"
          :aria-label="t.cart.close"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="cart-body">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
                stroke="currentColor" 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="empty-message">{{ t.cart.empty }}</p>
        </div>

        <div v-else class="cart-items">
          <CartItem 
            v-for="item in cartItems" 
            :key="item.album.id" 
            :item="item"
          />
        </div>
      </div>

      <!-- Cart Footer -->
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-summary">
          <div class="total-items">
            {{ cartCount }} {{ cartCount === 1 ? t.cart.item : t.cart.items }}
          </div>
          <div class="total-price">
            {{ t.cart.total }}: ${{ cartTotal.toFixed(2) }}
          </div>
        </div>
        
        <div class="cart-actions">
          <button 
            @click="clearCart" 
            class="btn btn-secondary"
            :aria-label="t.cart.clearAll"
          >
            {{ t.cart.clear }}
          </button>
          <button 
            @click="proceedToCheckout" 
            class="btn btn-primary"
            :aria-label="t.cart.checkout"
          >
            {{ t.cart.checkout }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCart } from '../composables/useCart'
import { useI18n } from '../composables/useI18n'
import CartItem from './CartItem.vue'

const { cartItems, cartCount, cartTotal, isCartOpen, closeCart, clearCart } = useCart()
const { t } = useI18n()

const proceedToCheckout = (): void => {
  // TODO: Implement checkout functionality
  alert('Checkout functionality will be implemented in a future version!')
  closeCart()
}

// Handle escape key to close cart
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && isCartOpen.value) {
    closeCart()
  }
}

// Focus management for accessibility
const focusFirstElement = (): void => {
  const cartContent = document.querySelector('.cart-content') as HTMLElement
  if (cartContent) {
    const focusableElements = cartContent.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    if (firstElement) {
      firstElement.focus()
    }
  }
}

// Trap focus within cart dropdown
const handleTabKey = (event: KeyboardEvent): void => {
  if (!isCartOpen.value) return
  
  const cartContent = document.querySelector('.cart-content') as HTMLElement
  if (!cartContent) return
  
  const focusableElements = Array.from(cartContent.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )) as HTMLElement[]
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement?.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement?.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keydown', handleTabKey)
  
  // Focus first element when cart opens
  if (isCartOpen.value) {
    setTimeout(focusFirstElement, 100)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('keydown', handleTabKey)
})
</script>

<style scoped>
.cart-dropdown {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 20px;
}

.cart-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

.cart-content {
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  min-height: 0;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-icon {
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 16px;
}

.empty-message {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
  margin: 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.total-items {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.total-price {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.cart-actions {
  display: flex;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .cart-dropdown {
    padding: 0;
    align-items: stretch;
  }
  
  .cart-content {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }
  
  .cart-header {
    padding: 16px;
  }
  
  .cart-title {
    font-size: 18px;
  }
  
  .cart-body {
    padding: 16px;
  }
  
  .cart-footer {
    padding: 16px;
  }
  
  .cart-actions {
    flex-direction: column;
  }
  
  .btn {
    padding: 14px 16px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .cart-content {
    border-width: 2px;
    border-color: white;
  }
  
  .cart-header,
  .cart-footer,
  .cart-summary {
    border-color: rgba(255, 255, 255, 0.5);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .cart-backdrop,
  .cart-content {
    animation: none;
  }
  
  .close-btn,
  .btn {
    transition: none;
  }
  
  .btn-primary:hover {
    transform: none;
  }
}

/* Custom scrollbar for cart items */
.cart-body::-webkit-scrollbar {
  width: 6px;
}

.cart-body::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.cart-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.cart-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>