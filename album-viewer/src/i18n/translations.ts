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
  cart: {
    title: string
    empty: string
    item: string
    items: string
    total: string
    clear: string
    checkout: string
    close: string
    clearAll: string
    addToCart: string
    removeFromCart: string
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
    cart: {
      title: 'Shopping Cart',
      empty: 'Your cart is empty',
      item: 'item',
      items: 'items',
      total: 'Total',
      clear: 'Clear Cart',
      checkout: 'Checkout',
      close: 'Close cart',
      clearAll: 'Clear all items from cart',
      addToCart: 'Add to cart',
      removeFromCart: 'Remove from cart'
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
    cart: {
      title: 'Panier d\'Achats',
      empty: 'Votre panier est vide',
      item: 'article',
      items: 'articles',
      total: 'Total',
      clear: 'Vider le Panier',
      checkout: 'Commander',
      close: 'Fermer le panier',
      clearAll: 'Vider tous les articles du panier',
      addToCart: 'Ajouter au panier',
      removeFromCart: 'Retirer du panier'
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
    cart: {
      title: 'Warenkorb',
      empty: 'Ihr Warenkorb ist leer',
      item: 'Artikel',
      items: 'Artikel',
      total: 'Gesamt',
      clear: 'Warenkorb leeren',
      checkout: 'Zur Kasse',
      close: 'Warenkorb schließen',
      clearAll: 'Alle Artikel aus dem Warenkorb entfernen',
      addToCart: 'In den Warenkorb',
      removeFromCart: 'Aus dem Warenkorb entfernen'
    },
    language: {
      select: 'Sprache',
      en: 'Englisch',
      fr: 'Französisch',
      de: 'Deutsch'
    }
  }
}
