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
import { siteCopy } from './data/siteContent'

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
  </div>
</template>

<style scoped>
.page-shell {
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 1rem 0 4rem;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: grid;
  gap: 0.85rem;
  padding: 0.9rem 0 1.4rem;
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
  border: 1px solid rgba(16, 62, 57, 0.08);
  border-radius: 999px;
  background: rgba(255, 248, 239, 0.68);
  box-shadow: 0 16px 40px rgba(73, 48, 20, 0.08);
  backdrop-filter: blur(18px);
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
  border-color: rgba(16, 62, 57, 0.14);
  background: rgba(255, 248, 239, 0.88);
  box-shadow: 0 18px 30px rgba(34, 44, 42, 0.14);
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
  background: radial-gradient(circle at 30% 30%, #1c756a, #103e39 72%);
  color: #fff7ed;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: 0 12px 24px rgba(15, 92, 83, 0.2);
  transition: transform 220ms ease;
}

.site-mark:hover {
  transform: translateY(-1px);
}

.site-mark-text {
  display: inline-block;
  font-size: 1.05rem;
  line-height: 1;
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
  background: rgba(255, 255, 255, 0.56);
  isolation: isolate;
}

.site-nav-indicator {
  position: absolute;
  top: 0.25rem;
  left: 0;
  bottom: 0.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #154d46, #103e39);
  box-shadow: 0 10px 20px rgba(15, 92, 83, 0.18);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), width 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease;
  z-index: 0;
  pointer-events: none;
}

.site-nav-link {
  position: relative;
  z-index: 1;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  color: #214340;
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 1;
  transition: color 180ms ease, transform 220ms ease, font-weight 180ms ease;
}

.site-nav-link:hover {
  color: #0f5c53;
  transform: translateY(-1px);
}

.site-nav-link-active,
.site-nav-link-active:hover {
  color: #fff7ed;
  font-weight: 700;
  transform: scale(1.045);
}

.language-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.3rem;
  border: 1px solid rgba(16, 62, 57, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 10px 22px rgba(73, 48, 20, 0.08);
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
  color: #31534f;
  font-size: 0.9rem;
  font-weight: 700;
  transition: background-color 180ms ease, color 180ms ease;
}

.language-pill-active {
  background: #103e39;
  color: #fff7ed;
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
  box-shadow: 0 10px 20px rgba(73, 48, 20, 0.08);
  cursor: pointer;
}

.menu-toggle-line {
  position: absolute;
  width: 1.1rem;
  height: 2px;
  border-radius: 999px;
  background: #103e39;
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
  border: 1px solid rgba(16, 62, 57, 0.1);
  border-radius: 28px;
  background: rgba(255, 248, 239, 0.92);
  box-shadow: 0 22px 34px rgba(34, 44, 42, 0.14);
  backdrop-filter: blur(18px);
}

.site-nav-mobile-link {
  padding: 0.95rem 1rem;
  border-radius: 20px;
  color: #214340;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.55);
  transition: background-color 180ms ease, color 180ms ease;
}

.site-nav-mobile-link-active {
  background: #103e39;
  color: #fff7ed;
}

.site-main {
  display: grid;
  gap: 3.5rem;
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
}
</style>
