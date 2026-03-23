<script setup lang="ts">
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import { projects } from '../data/siteContent'
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Projects overview</p>
      <h1 class="page-title">作品集</h1>
      <p class="page-description">
        這一頁聚焦我做過的前端專案，包含定位、成果、技術選型與後續可延伸的方向。
      </p>
    </section>

    <PortfolioSection :items="projects" />
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 2rem;
}

.page-intro {
  max-width: 56ch;
}

.page-kicker {
  margin: 0 0 0.75rem;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.page-title {
  margin: 0;
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1;
}

.page-description {
  margin: 1rem 0 0;
  color: #31534f;
  line-height: 1.8;
}
</style>
