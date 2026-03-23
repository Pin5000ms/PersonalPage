<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import ProjectCarousel from './ProjectCarousel.vue'
import type { LocalizedText, ProjectItem } from '../../data/siteContent'

interface Props {
  items: ProjectItem[]
  kicker: LocalizedText
  title: LocalizedText
  description: LocalizedText
  aiTitle: LocalizedText
  otherTitle: LocalizedText
  detailLabel: LocalizedText
  dragHint: LocalizedText
  autoScrollingLabel: LocalizedText
  pausedLabel: LocalizedText
}

const props = defineProps<Props>()
const { locale } = useLanguage()

function t(text?: LocalizedText) {
  return text?.[locale.value] ?? ''
}

const aiProjects = computed(() => props.items.filter((item) => item.group === 'ai'))
const otherProjects = computed(() => props.items.filter((item) => item.group === 'other'))
</script>

<template>
  <section class="portfolio" id="portfolio">
    <div class="section-heading">
      <p class="section-kicker">{{ t(kicker) }}</p>
      <h2 class="section-title">{{ t(title) }}</h2>
      <p class="section-description">
        {{ t(description) }}
      </p>
    </div>

    <div class="portfolio-columns">
      <ProjectCarousel
        v-if="aiProjects.length"
        :items="aiProjects"
        :title="aiTitle"
        icon="ai"
        :detail-label="detailLabel"
        :auto-scrolling-label="autoScrollingLabel"
        :paused-label="pausedLabel"
      />

      <ProjectCarousel
        v-if="otherProjects.length"
        :items="otherProjects"
        :title="otherTitle"
        icon="other"
        :detail-label="detailLabel"
        :auto-scrolling-label="autoScrollingLabel"
        :paused-label="pausedLabel"
      />
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  display: grid;
  gap: 1.5rem;
}

.section-heading {
  max-width: 65ch;
}

.section-kicker {
  margin: 0 0 0.75rem;
  color: #8a4b22;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-description {
  margin: 1rem 0 0;
  color: #31534f;
  line-height: 1.8;
}

.portfolio-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 980px) {
  .portfolio-columns {
    grid-template-columns: 1fr;
  }
}
</style>
