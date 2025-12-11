<template>
  <div class="cart-icon" @click="toggleCart">
    <div class="cart-button" :class="{ 'has-items': cartCount > 0 }">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
      
      <span 
        v-if="cartCount > 0" 
        class="cart-badge"
        :aria-label="`${cartCount} items in cart`"
      >
        {{ cartCount > 99 ? '99+' : cartCount }}
      </span>
    </div>
    
    <span class="sr-only">{{ t.cart.title }} - {{ cartCount }} {{ t.cart.itemCount }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import { useI18n } from '../composables/useI18n'

const { cartCount, toggleCart } = useCart()
const { t } = useI18n()
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  user-select: none;
}

.cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;
  position: relative;
}

.cart-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.cart-button.has-items {
  background: rgba(102, 126, 234, 0.8);
  border-color: rgba(102, 126, 234, 0.5);
}

.cart-button.has-items:hover {
  background: rgba(102, 126, 234, 0.9);
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ef4444;
  color: white;
  border-radius: 10px;
  min-width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  padding: 0 4px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  animation: bounceIn 0.3s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .cart-button {
    width: 40px;
    height: 40px;
  }
  
  .cart-badge {
    top: -4px;
    right: -4px;
    min-width: 18px;
    height: 18px;
    font-size: 10px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .cart-button {
    border-width: 2px;
  }
  
  .cart-badge {
    border-width: 3px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .cart-button,
  .cart-badge {
    transition: none;
    animation: none;
  }
  
  .cart-button:hover {
    transform: none;
  }
}
</style>