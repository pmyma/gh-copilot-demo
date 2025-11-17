import { ref, computed, type Ref } from 'vue'
import { translations, type Translations } from '../i18n/translations'

type Language = 'en' | 'fr' | 'de'

const currentLanguage: Ref<Language> = ref('en')

// Load language from localStorage on initialization
const savedLanguage = localStorage.getItem('language') as Language | null
if (savedLanguage && ['en', 'fr', 'de'].includes(savedLanguage)) {
  currentLanguage.value = savedLanguage
}

export function useI18n() {
  const t = computed(() => {
    return (translations[currentLanguage.value] || translations.en) as Translations
  })

  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
  }

  const availableLanguages: Language[] = ['en', 'fr', 'de']

  return {
    t,
    currentLanguage: computed(() => currentLanguage.value),
    setLanguage,
    availableLanguages
  }
}
