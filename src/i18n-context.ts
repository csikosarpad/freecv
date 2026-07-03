import { createContext, useContext } from 'react'

import { formatMessage, translations, type Locale, type TranslationKey } from './i18n-data'

export type I18nContextValue = {
  locale: Locale
  t: (key: TranslationKey, replacements?: Record<string, string>) => string
}

export const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: (key, replacements) => formatMessage(translations.en[key], replacements),
})

export function useI18n() {
  return useContext(I18nContext)
}