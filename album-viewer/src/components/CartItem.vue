<template>
  <div class="cart-item">
    <div class="item-image">
      <img 
        :src="item.album.image_url" 
        :alt="item.album.title"
        @error="handleImageError"
        loading="lazy"
      />
    </div>
    
    <div class="item-details">
      <h4 class="item-title">{{ item.album.title }}</h4>
      <p class="item-artist">{{ item.album.artist }}</p>
      <div class="item-price">${{ item.album.price.toFixed(2) }}</div>
    </div>
    
    <div class="item-quantity">
      <button 
        @click="decreaseQuantity"
        :disabled="item.quantity <= 1"
        class="quantity-btn"
        :aria-label="`Decrease quantity for ${item.album.title}`"
      >
        -
      </button>
      <span class="quantity-display">{{ item.quantity }}</span>
      <button 
        @click="increaseQuantity"
        class="quantity-btn"
        :aria-label="`Increase quantity for ${item.album.title}`"
      >
        +
      </button>
    </div>
    
    <div class="item-total">
      ${{ (item.album.price * item.quantity).toFixed(2) }}
    </div>
    
    <button 
      @click="removeItem"
      class="remove-btn"
      :aria-label="`Remove ${item.album.title} from cart`"
    >
      <svg 
        width="16" 
        height="16" 
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
</template>

<script setup lang="ts">
import { useCart } from '../composables/useCart'
import type { CartItem } from '../types/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const { updateQuantity, removeFromCart } = useCart()

const increaseQuantity = (): void => {
  updateQuantity(props.item.album.id, props.item.quantity + 1)
}

const decreaseQuantity = (): void => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.album.id, props.item.quantity - 1)
  }
}

const removeItem = (): void => {
  removeFromCart(props.item.album.id)
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/60x60/667eea/white?text=Album'
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.cart-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.item-image {
  flex-shrink: 0;
}

.item-image img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex: 1;
  min-width: 0; /* Allow text truncation */
}

.item-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-artist {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-price {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.quantity-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 600;
}

.quantity-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  font-size: 14px;
  font-weight: 600;
  color: white;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-size: 14px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
  min-width: 60px;
  text-align: right;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.05);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .cart-item {
    gap: 8px;
    padding: 8px;
  }
  
  .item-image img {
    width: 40px;
    height: 40px;
  }
  
  .item-title {
    font-size: 13px;
  }
  
  .item-artist,
  .item-price {
    font-size: 11px;
  }
  
  .quantity-btn {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
  
  .quantity-display,
  .item-total {
    font-size: 13px;
  }
  
  .remove-btn {
    width: 28px;
    height: 28px;
  }
  
  .remove-btn svg {
    width: 14px;
    height: 14px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .cart-item {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .quantity-btn,
  .remove-btn {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .cart-item,
  .quantity-btn,
  .remove-btn {
    transition: none;
  }
  
  .remove-btn:hover {
    transform: none;
  }
}
</style>