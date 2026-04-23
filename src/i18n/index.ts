import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'
import ja from './locales/ja.json'

export type Locale = 'fr' | 'en' | 'ja'

const savedLocale = localStorage.getItem('locale') as Locale | null
const browserLocale = navigator.language.split('-')[0] as Locale
const defaultLocale: Locale = savedLocale ?? (['fr', 'en', 'ja'].includes(browserLocale) ? browserLocale : 'fr')

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'fr',
  messages: { fr, en, ja },
})
