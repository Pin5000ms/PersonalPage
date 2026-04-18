<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  watch,
} from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useLanguage } from './composables/useLanguage'
import { contactInfo, profile, siteCopy } from './data/siteContent'

const route = useRoute()
const { locale, toggleLanguage } = useLanguage()
const isMenuOpen = shallowRef(false)
const isScrolled = shallowRef(false)
const desktopNav = shallowRef<HTMLElement | null>(null)
const indicatorWidth = shallowRef(0)
const indicatorOffset = shallowRef(0)
const indicatorVisible = shallowRef(false)
const indicatorPadding = 10

const navItems = computed(() => siteCopy.nav)
const footerLinks = computed(() => contactInfo)
const footerCopyright = computed(() => `© ${new Date().getFullYear()} ${profile.name.en}. All Rights Reserved.`)
const contactIcons: Record<string, string> = {
  Email: 'M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Zm2 0v.24l6 4.37 6-4.37v-.24a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75Zm12 2.71-5.41 3.95a1 1 0 0 1-1.18 0L6 9.46v7.79c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75V9.46Z',
  GitHub: 'M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.09.63-.2.63-.45 0-.22-.01-.96-.01-1.74-2.31.42-2.91-.57-3.1-1.1-.1-.27-.54-1.1-.92-1.32-.31-.17-.76-.6-.01-.61.7-.01 1.2.64 1.37.91.8 1.35 2.09.97 2.6.74.08-.58.31-.97.56-1.19-2.05-.23-4.18-1.03-4.18-4.56 0-1.01.36-1.84.95-2.49-.09-.23-.41-1.17.09-2.44 0 0 .78-.25 2.56.95a8.86 8.86 0 0 1 4.66 0c1.78-1.21 2.56-.95 2.56-.95.5 1.27.18 2.21.09 2.44.59.65.95 1.47.95 2.49 0 3.54-2.14 4.33-4.19 4.56.32.27.6.79.6 1.6 0 1.16-.01 2.09-.01 2.38 0 .25.17.55.64.45A9.25 9.25 0 0 0 12 2.75Z',
  LinkedIn: 'M6.9 8.25a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM5.7 9.7h2.4V18H5.7V9.7Zm3.9 0h2.3v1.13h.03c.32-.61 1.1-1.26 2.26-1.26 2.42 0 2.87 1.59 2.87 3.66V18h-2.4v-4.23c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.24V18H9.6V9.7Z',
}

const headerClasses = computed(() => ({
  'site-header-scrolled': isScrolled.value,
  'site-header-open': isMenuOpen.value,
}))

const desktopIndicatorStyle = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform: `translateX(${indicatorOffset.value}px)`,
  opacity: indicatorVisible.value ? '1' : '0',
}))

const currentMark = computed(() => {
  const activeItem = navItems.value.find((item) => item.to === route.path)
  return activeItem?.mark ?? '我'
})

function syncScrollState() {
  isScrolled.value = window.scrollY > 24
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function getContactIcon(label: string) {
  return contactIcons[label] ?? contactIcons.Email
}

function syncDesktopIndicator() {
  const navElement = desktopNav.value
  const activeElement = navElement?.querySelector<HTMLElement>('.site-nav-link-active')

  if (!navElement || !activeElement) {
    indicatorVisible.value = false
    return
  }

  indicatorWidth.value = activeElement.offsetWidth + indicatorPadding * 2
  indicatorOffset.value = Math.max(activeElement.offsetLeft - indicatorPadding, 0)
  indicatorVisible.value = true
}

watch(
  () => route.path,
  async () => {
    closeMenu()
    await nextTick()
    syncDesktopIndicator()
  },
  { immediate: true },
)

onMounted(() => {
  syncScrollState()
  window.addEventListener('scroll', syncScrollState, { passive: true })
  window.addEventListener('resize', syncDesktopIndicator, { passive: true })

  nextTick(() => {
    syncDesktopIndicator()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncScrollState)
  window.removeEventListener('resize', syncDesktopIndicator)
})
</script>

<template>
  <div class="page-shell">
    <header class="site-header" :class="headerClasses">
      <div class="site-header-bar">
        <RouterLink class="site-mark" to="/about">
          <span class="site-mark-text">{{ currentMark }}</span>
        </RouterLink>

        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="isMenuOpen"
          aria-controls="primary-navigation"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <span class="menu-toggle-line" :class="{ 'menu-toggle-line-top-open': isMenuOpen }" />
          <span class="menu-toggle-line" :class="{ 'menu-toggle-line-middle-open': isMenuOpen }" />
          <span class="menu-toggle-line" :class="{ 'menu-toggle-line-bottom-open': isMenuOpen }" />
        </button>

        <div class="site-header-actions">
          <nav ref="desktopNav" class="site-nav site-nav-desktop" aria-label="Primary navigation">
            <span class="site-nav-indicator" :style="desktopIndicatorStyle" />
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              class="site-nav-link"
              :class="{ 'site-nav-link-active': route.path === item.to }"
              :to="item.to"
            >
              {{ item.label.zh }}
            </RouterLink>
          </nav>

          <button
            class="language-toggle"
            type="button"
            :aria-label="siteCopy.languageSwitch.label.zh"
            @click="toggleLanguage"
          >
            <span class="language-pill" :class="{ 'language-pill-active': locale === 'zh' }">
              {{ siteCopy.languageSwitch.zh }}
            </span>
            <span class="language-pill" :class="{ 'language-pill-active': locale === 'en' }">
              {{ siteCopy.languageSwitch.en }}
            </span>
          </button>
        </div>
      </div>

      <transition name="mobile-nav">
        <div v-if="isMenuOpen" class="mobile-panel">
          <button
            class="language-toggle language-toggle-mobile"
            type="button"
            :aria-label="siteCopy.languageSwitch.label.zh"
            @click="toggleLanguage"
          >
            <span class="language-pill" :class="{ 'language-pill-active': locale === 'zh' }">
              {{ siteCopy.languageSwitch.zh }}
            </span>
            <span class="language-pill" :class="{ 'language-pill-active': locale === 'en' }">
              {{ siteCopy.languageSwitch.en }}
            </span>
          </button>

          <nav
            id="primary-navigation"
            class="site-nav-mobile"
            aria-label="Mobile primary navigation"
          >
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              class="site-nav-mobile-link"
              :class="{ 'site-nav-mobile-link-active': route.path === item.to }"
              :to="item.to"
              @click="closeMenu"
            >
              {{ item.label.zh }}
            </RouterLink>
          </nav>
        </div>
      </transition>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <footer class="site-footer">
      <div class="site-footer-panel">
        <div class="site-footer-column">
          <p class="site-footer-heading">{{ locale === 'zh' ? '導覽' : 'Navigate' }}</p>
          <nav class="site-footer-nav" aria-label="Footer navigation">
            <RouterLink
              v-for="item in navItems"
              :key="`footer-${item.to}`"
              class="site-footer-link"
              :to="item.to"
            >
              {{ item.label[locale] }}
            </RouterLink>
          </nav>
        </div>

        <div class="site-footer-column">
          <p class="site-footer-heading">{{ locale === 'zh' ? '聯絡方式' : 'Connect' }}</p>
          <div class="site-footer-links">
            <a
              v-for="item in footerLinks"
              :key="item.label"
              class="site-footer-contact"
              :class="{
                'site-footer-contact-disabled': !item.href,
                'site-footer-contact-linkedin': item.label === 'LinkedIn',
              }"
              :href="item.href || undefined"
              :target="item.href.startsWith('http') ? '_blank' : undefined"
              :rel="item.href.startsWith('http') ? 'noreferrer' : undefined"
              :aria-label="item.label"
              :title="item.value"
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path :d="getContactIcon(item.label)" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="site-footer-meta">
        <p class="site-footer-copy">{{ footerCopyright }}</p>
        <RouterLink class="site-footer-back" to="/about">
          {{ locale === 'zh' ? '回到頁首' : 'Back to top' }}
        </RouterLink>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.page-shell {
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 1.4rem 0 5.5rem;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  gap: 0.85rem;
  padding: 0.9rem 0 1.4rem;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition:
    padding 220ms ease,
    transform 220ms ease;
}

.site-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: rgba(249, 247, 241, 0.82);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(12px);
  transition:
    padding 220ms ease,
    box-shadow 220ms ease,
    background-color 220ms ease,
    border-color 220ms ease;
}

.site-header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header-scrolled {
  padding-top: 0.45rem;
}

.site-header-scrolled .site-header-bar {
  padding: 0.5rem 0.7rem;
  border-color: var(--color-line-strong);
  background: rgba(249, 247, 241, 0.94);
  box-shadow: 0 14px 28px rgba(88, 104, 97, 0.12);
}

.site-header-open .site-header-bar {
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
}

.site-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #8ea9a0, #617d77);
  color: #f9f7f1;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 12px 24px rgba(95, 125, 118, 0.22);
  transition: transform 220ms ease;
}

.site-mark:hover {
  transform: translateY(-1px);
}

.site-mark-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mark);
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  line-height: 1;
  min-height: 1em;
}

.site-nav {
  display: flex;
  align-items: center;
}

.site-nav-desktop {
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.52);
  isolation: isolate;
}

.site-nav-indicator {
  position: absolute;
  top: 0.25rem;
  left: 0;
  bottom: 0.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #7d9890, #556f69);
  box-shadow: 0 10px 20px rgba(95, 125, 118, 0.2);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), width 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
  z-index: 0;
  pointer-events: none;
}

.site-nav-link {
  position: relative;
  z-index: 1;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1;
  transition: color 180ms ease, transform 220ms ease, font-weight 180ms ease;
}

.site-nav-link:hover {
  color: var(--color-primary-deep);
  transform: translateY(-1px);
}

.site-nav-link-active,
.site-nav-link-active:hover {
  color: #f8f6ef;
  font-weight: 700;
  transform: scale(1.045);
}

.language-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.3rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 10px 22px rgba(88, 104, 97, 0.08);
  cursor: pointer;
}

.language-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  min-height: 2.3rem;
  padding: 0 0.85rem;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 700;
  transition: background-color 180ms ease, color 180ms ease;
}

.language-pill-active {
  background: var(--color-primary-deep);
  color: #f8f6ef;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 10px 20px rgba(88, 104, 97, 0.08);
  cursor: pointer;
}

.menu-toggle-line {
  position: absolute;
  width: 1.1rem;
  height: 2px;
  border-radius: 999px;
  background: var(--color-primary-deep);
  transition: transform 180ms ease, opacity 180ms ease;
}

.menu-toggle {
  position: relative;
}

.menu-toggle-line:nth-child(1) {
  transform: translateY(-0.3rem);
}

.menu-toggle-line:nth-child(2) {
  transform: translateY(0);
}

.menu-toggle-line:nth-child(3) {
  transform: translateY(0.3rem);
}

.menu-toggle-line-top-open {
  transform: translateY(0) rotate(45deg) !important;
}

.menu-toggle-line-middle-open {
  opacity: 0;
}

.menu-toggle-line-bottom-open {
  transform: translateY(0) rotate(-45deg) !important;
}

.mobile-panel {
  display: grid;
  gap: 0.75rem;
}

.language-toggle-mobile {
  justify-self: start;
}

.site-nav-mobile {
  display: grid;
  gap: 0.55rem;
  padding: 0.35rem;
  border: 1px solid var(--color-line);
  border-radius: 28px;
  background: rgba(249, 247, 241, 0.96);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(12px);
}

.site-nav-mobile-link {
  padding: 0.95rem 1rem;
  border-radius: 20px;
  color: var(--color-text);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.55);
  transition: background-color 180ms ease, color 180ms ease;
}

.site-nav-mobile-link-active {
  background: var(--color-primary-deep);
  color: #f8f6ef;
}

.site-main {
  display: grid;
  gap: 4.75rem;
}

.site-footer {
  display: grid;
  gap: 1rem;
  margin-top: 4.5rem;
  padding-top: 1rem;
}

.site-footer-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 1.6rem;
  border: 1px solid var(--color-line);
  border-radius: 2rem;
  background:
    radial-gradient(circle at top right, rgba(223, 234, 228, 0.24), transparent 28%),
    linear-gradient(180deg, rgba(249, 247, 241, 0.94), rgba(243, 239, 231, 0.92));
  box-shadow: var(--shadow-soft);
}

.site-footer-column,
.site-footer-nav,
.site-footer-links {
  display: grid;
  gap: 0.7rem;
}

.site-footer-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
}

.site-footer-heading,
.site-footer-copy {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.site-footer-link,
.site-footer-back {
  width: fit-content;
  color: var(--color-primary-deep);
  text-decoration: none;
  transition: color 180ms ease, transform 180ms ease;
}

.site-footer-link:hover,
.site-footer-back:hover {
  color: var(--color-text);
  transform: translateX(2px);
}

.site-footer-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  height: 2.9rem;
  border: 1px solid var(--color-line-strong);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-primary-deep);
  text-decoration: none;
  box-shadow: 0 10px 18px rgba(88, 104, 97, 0.08);
  transition:
    transform 200ms ease,
    border-color 200ms ease,
    background-color 200ms ease,
    color 200ms ease,
    box-shadow 200ms ease;
}

.site-footer-contact svg {
  width: 1.4rem;
  height: 1.4rem;
  fill: currentColor;
}

.site-footer-contact:hover {
  transform: translateY(-2px);
  border-color: rgba(95, 125, 118, 0.26);
  background: rgba(255, 255, 255, 0.94);
  color: var(--color-text);
  box-shadow: 0 14px 24px rgba(88, 104, 97, 0.12);
}

.site-footer-contact-linkedin svg {
  width: 1.25rem;
  height: 1.25rem;
}

.site-footer-contact-disabled {
  opacity: 0.48;
  pointer-events: none;
}

.site-footer-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 0.2rem;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 920px) {
  .page-shell {
    width: min(1120px, calc(100vw - 1.2rem));
  }

  .site-header-bar {
    border-radius: 28px;
  }

  .site-header-actions {
    margin-left: auto;
  }

  .site-nav-desktop,
  .site-header-actions > .language-toggle {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .site-footer-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page-shell {
    padding-bottom: 4.25rem;
  }

  .site-header {
    padding-bottom: 1rem;
    transition: none;
  }

  .site-header-bar {
    padding: 0.65rem 0.7rem;
    backdrop-filter: none;
    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      box-shadow 180ms ease;
  }

  .site-main {
    gap: 3.5rem;
  }

  .site-footer {
    margin-top: 3.5rem;
  }

  .site-footer-panel {
    padding: 1.25rem;
    border-radius: 1.5rem;
  }

  .site-footer-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
