<script setup lang="ts">
import { computed } from 'vue'
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { projects, siteCopy } from '../data/siteContent'

const { locale } = useLanguage()

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const pageCopy = computed(() => siteCopy.projectsPage)
const sectionCopy = computed(() => siteCopy.projectsSection)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">{{ t(pageCopy.kicker) }}</p>
      <h1 class="page-title">{{ t(pageCopy.title) }}</h1>
      <p class="page-description">{{ t(pageCopy.description) }}</p>
    </section>

    <PortfolioSection
      :items="projects"
      :kicker="sectionCopy.kicker"
      :title="sectionCopy.title"
      :description="sectionCopy.description"
      :drag-hint="sectionCopy.dragHint"
      :auto-scrolling-label="sectionCopy.autoScrolling"
      :paused-label="sectionCopy.paused"
    />
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
