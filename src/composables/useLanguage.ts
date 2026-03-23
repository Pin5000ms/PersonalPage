import { onMounted, shallowRef } from 'vue'

export type Locale = 'zh' | 'en'

const STORAGE_KEY = 'personal-page-locale'
const locale = shallowRef<Locale>('zh')

export function useLanguage() {
  function setLanguage(nextLocale: Locale) {
    locale.value = nextLocale
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale)
      document.documentElement.lang = nextLocale === 'zh' ? 'zh-Hant' : 'en'
    }
  }

  function toggleLanguage() {
    setLanguage(locale.value === 'zh' ? 'en' : 'zh')
  }

  onMounted(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY)
    if (savedLocale === 'zh' || savedLocale === 'en') {
      setLanguage(savedLocale)
      return
    }

    document.documentElement.lang = locale.value === 'zh' ? 'zh-Hant' : 'en'
  })

  return {
    locale,
    setLanguage,
    toggleLanguage,
  }
}
