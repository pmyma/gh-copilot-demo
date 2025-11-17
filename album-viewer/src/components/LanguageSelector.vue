<template>
  <div class="language-selector">
    <label for="language-select" class="language-label">
      {{ t.language.select }}:
    </label>
    <select 
      id="language-select"
      v-model="selectedLanguage" 
      @change="handleLanguageChange"
      class="language-select"
    >
      <option value="en">{{ t.language.en }}</option>
      <option value="fr">{{ t.language.fr }}</option>
      <option value="de">{{ t.language.de }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from '../composables/useI18n'

const { t, currentLanguage, setLanguage } = useI18n()
const selectedLanguage = ref(currentLanguage.value)

// Watch for external language changes
watch(currentLanguage, (newLang) => {
  selectedLanguage.value = newLang
})

const handleLanguageChange = () => {
  setLanguage(selectedLanguage.value as 'en' | 'fr' | 'de')
}
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-label {
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.language-select {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  backdrop-filter: blur(10px);
}

.language-select:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.language-select:focus {
  background: rgba(255, 255, 255, 0.35);
  border-color: white;
}

.language-select option {
  background: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .language-selector {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .language-label {
    font-size: 0.8rem;
  }
  
  .language-select {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>
