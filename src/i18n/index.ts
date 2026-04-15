import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'

export type Locale = 'fr' | 'en'

const savedLocale = localStorage.getItem('locale') as Locale | null
const browserLocale = navigator.language.split('-')[0] as Locale
const defaultLocale: Locale = savedLocale ?? (['fr', 'en'].includes(browserLocale) ? browserLocale : 'fr')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'fr',
  messages: { fr, en },
})
