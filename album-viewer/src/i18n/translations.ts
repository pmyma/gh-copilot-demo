export interface Translations {
  header: {
    title: string
    subtitle: string
  }
  loading: string
  error: {
    message: string
    retryButton: string
  }
  albumCard: {
    addToCart: string
    preview: string
  }
  language: {
    select: string
    en: string
    fr: string
    de: string
  }
}

export const translations: Record<string, Translations> = {
  en: {
    header: {
      title: '🎵 Album Collection',
      subtitle: 'Discover amazing music albums'
    },
    loading: 'Loading albums...',
    error: {
      message: 'Failed to load albums. Please make sure the API is running.',
      retryButton: 'Try Again'
    },
    albumCard: {
      addToCart: 'Add to Cart',
      preview: 'Preview'
    },
    language: {
      select: 'Language',
      en: 'English',
      fr: 'French',
      de: 'German'
    }
  },
  fr: {
    header: {
      title: '🎵 Collection d\'Albums',
      subtitle: 'Découvrez des albums musicaux incroyables'
    },
    loading: 'Chargement des albums...',
    error: {
      message: 'Échec du chargement des albums. Veuillez vous assurer que l\'API est en cours d\'exécution.',
      retryButton: 'Réessayer'
    },
    albumCard: {
      addToCart: 'Ajouter au Panier',
      preview: 'Aperçu'
    },
    language: {
      select: 'Langue',
      en: 'Anglais',
      fr: 'Français',
      de: 'Allemand'
    }
  },
  de: {
    header: {
      title: '🎵 Album-Sammlung',
      subtitle: 'Entdecken Sie erstaunliche Musikalben'
    },
    loading: 'Alben werden geladen...',
    error: {
      message: 'Fehler beim Laden der Alben. Bitte stellen Sie sicher, dass die API läuft.',
      retryButton: 'Erneut versuchen'
    },
    albumCard: {
      addToCart: 'In den Warenkorb',
      preview: 'Vorschau'
    },
    language: {
      select: 'Sprache',
      en: 'Englisch',
      fr: 'Französisch',
      de: 'Deutsch'
    }
  }
}
