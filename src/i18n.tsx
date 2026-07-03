import type { ReactNode } from 'react'
import { I18nContext } from './i18n-context'
import { formatMessage, getTranslations, type Locale } from './i18n-data'

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dictionary = getTranslations(locale)

  return (
    <I18nContext.Provider
      value={{
        locale,
        t: (key, replacements) => formatMessage(dictionary[key], replacements),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
