<template>
  <div class="album-card">
    <div class="album-image">
      <img 
        :src="album.image_url" 
        :alt="album.title"
        @error="handleImageError"
        loading="lazy"
      />
      <div class="play-overlay">
        <div class="play-button">▶</div>
      </div>
    </div>
    
    <div class="album-info">
      <h3 class="album-title">{{ album.title }}</h3>
      <p class="album-artist">{{ album.artist }}</p>
      <div class="album-price">
        <span class="price">${{ album.price.toFixed(2) }}</span>
      </div>
    </div>
    
    <div class="album-actions">
      <button 
        @click="handleAddToCart" 
        class="btn btn-primary"
        :class="{ 'added': isInCartState }"
        :disabled="addToCartLoading"
      >
        <span v-if="!addToCartLoading">
          {{ isInCartState ? `${t.cart.addToCart} (${getItemQuantity(album.id)})` : t.albumCard.addToCart }}
        </span>
        <span v-else class="loading-spinner"></span>
      </button>
      <button class="btn btn-secondary">{{ t.albumCard.preview }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { useCart } from '../composables/useCart'
import type { Album } from '../types/album'

const { t } = useI18n()
const { addToCart, isInCart, getItemQuantity } = useCart()

interface Props {
  album: Album
}

const props = defineProps<Props>()

const addToCartLoading = ref(false)
const isInCartState = ref(isInCart(props.album.id))

const handleAddToCart = async (): Promise<void> => {
  if (addToCartLoading.value) return
  
  addToCartLoading.value = true
  
  try {
    // Add visual feedback delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addToCart(props.album)
    isInCartState.value = isInCart(props.album.id)
    
    // Brief success animation delay
    await new Promise(resolve => setTimeout(resolve, 200))
  } catch (error) {
    console.error('Failed to add item to cart:', error)
  } finally {
    addToCartLoading.value = false
  }
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300/667eea/white?text=Album+Cover'
}
</script>

<style scoped>
.album-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.album-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.album-image {
  position: relative;
  overflow: hidden;
}

.album-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-card:hover .album-image img {
  transform: scale(1.1);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-card:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #667eea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: white;
  transform: scale(1.1);
}

.album-info {
  padding: 1.5rem;
}

.album-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.album-artist {
  color: #666;
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.album-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.album-actions {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b5b95 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-primary.added {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  animation: addedPulse 0.6s ease-out;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes addedPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(72, 187, 120, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(72, 187, 120, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(72, 187, 120, 0.3);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.btn-secondary {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .album-info {
    padding: 1rem;
  }
  
  .album-actions {
    padding: 0 1rem 1rem;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
