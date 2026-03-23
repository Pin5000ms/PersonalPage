<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'About me (關於我)', to: '/about' },
  { label: 'Articles (技術分享文章)', to: '/articles' },
  { label: 'Projects (作品集)', to: '/projects' },
  { label: 'Interview (面試經驗)', to: '/interview' },
]
</script>

<template>
  <div class="page-shell">
    <header class="site-header">
      <RouterLink class="site-mark" to="/about">TY</RouterLink>
      <nav class="site-nav" aria-label="Primary navigation">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          class="site-nav-link"
          :class="{ 'site-nav-link-active': route.path === item.to }"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
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
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0 1.4rem;
  backdrop-filter: blur(12px);
}

.site-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #103e39;
  color: #fff7ed;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.site-nav-link {
  padding: 0.65rem 1rem;
  border-radius: 999px;
  color: #214340;
  text-decoration: none;
  transition: color 180ms ease, background-color 180ms ease;
}

.site-nav-link:hover {
  color: #0f5c53;
  background: rgba(255, 255, 255, 0.5);
}

.site-nav-link-active {
  background: #103e39;
  color: #fff7ed;
}

.site-main {
  display: grid;
  gap: 3.5rem;
}

@media (max-width: 680px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
