<script setup lang="ts">
import { computed } from 'vue'
import ProjectBlocksSection from '../components/sections/ProjectBlocksSection.vue'
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

    <ProjectBlocksSection
      :items="projects"
      :kicker="sectionCopy.kicker"
      :title="sectionCopy.title"
      :description="sectionCopy.description"
      :ai-title="sectionCopy.aiTitle"
      :other-title="sectionCopy.otherTitle"
      :detail-label="sectionCopy.detailLabel"
      :drag-hint="sectionCopy.dragHint"
      :auto-scrolling-label="sectionCopy.autoScrolling"
      :paused-label="sectionCopy.paused"
    />
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 3.25rem;
}

.page-intro {
  max-width: 62ch;
  padding-top: 0.6rem;
}

.page-kicker {
  margin: 0 0 0.75rem;
  color: var(--color-accent);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.page-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05;
}

.page-description {
  margin: 1.25rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.9;
}

@media (max-width: 720px) {
  .view-shell {
    gap: 2.5rem;
  }

  .page-title {
    font-size: clamp(2.1rem, 11vw, 3rem);
  }
}
</style>

