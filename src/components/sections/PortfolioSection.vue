<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../../composables/useLanguage'
import { useAutoScrollTrack } from '../../composables/useAutoScrollTrack'
import type { LocalizedText, ProjectItem } from '../../data/siteContent'

interface Props {
  items: ProjectItem[]
  kicker: LocalizedText
  title: LocalizedText
  description: LocalizedText
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

function getProjectToneClass(tone?: string) {
  switch (tone) {
    case 'ocean':
      return 'project-preview-ocean'
    case 'copper':
      return 'project-preview-copper'
    case 'sunrise':
      return 'project-preview-sunrise'
    case 'forest':
    default:
      return 'project-preview-forest'
  }
}

const projectCards = computed(() => props.items)
const projectTrack = useTemplateRef<HTMLElement>('projectTrack')
const {
  canScroll: canScrollProjects,
  isAutoScrolling: isAutoScrollingProjects,
  pauseWithResume: pauseProjectsTrack,
} = useAutoScrollTrack(projectTrack, computed(() => props.items.length), {
  threshold: 2,
  speed: 0.4,
})
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

    <div
      ref="projectTrack"
      class="project-track"
      :class="{ 'project-track-active': canScrollProjects }"
      @mouseenter="pauseProjectsTrack"
      @mouseleave="pauseProjectsTrack"
      @touchstart.passive="pauseProjectsTrack"
      @wheel.passive="pauseProjectsTrack"
      @pointerdown="pauseProjectsTrack"
      @focusin="pauseProjectsTrack"
    >
      <article
        v-for="project in projectCards"
        :key="t(project.title)"
        class="project-card"
      >
        <div class="project-preview" :class="getProjectToneClass(project.coverImageTone)">
          <img
            v-if="project.coverImageSrc"
            class="project-preview-image"
            :src="project.coverImageSrc"
            :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
            loading="lazy"
          />
          <div v-else class="project-preview-fallback">
            <div class="project-preview-chip">{{ t(project.category) }}</div>
            <div class="project-preview-grid" aria-hidden="true">
              <span class="project-preview-block project-preview-block-wide" />
              <span class="project-preview-block" />
              <span class="project-preview-block" />
              <span class="project-preview-block project-preview-block-tall" />
            </div>
          </div>
        </div>

        <div class="project-head">
          <p class="project-category">{{ t(project.category) }}</p>
          <h3 class="project-title">{{ t(project.title) }}</h3>
        </div>

        <p class="project-summary">{{ t(project.summary) }}</p>
        <p class="project-outcome">{{ t(project.outcome) }}</p>

        <figure v-if="project.detailImageSrc" class="project-detail-figure">
          <img
            class="project-detail-image"
            :src="project.detailImageSrc"
            :alt="project.detailImageAlt ? t(project.detailImageAlt) : t(project.title)"
            loading="lazy"
          />
          <figcaption v-if="project.detailImageAlt" class="project-detail-caption">
            {{ t(project.detailImageAlt) }}
          </figcaption>
        </figure>

        <dl class="project-metrics">
          <div
            v-for="metric in project.metrics"
            :key="t(metric.label)"
            class="project-metric"
          >
            <dt class="project-metric-label">{{ t(metric.label) }}</dt>
            <dd class="project-metric-value">{{ t(metric.value) }}</dd>
          </div>
        </dl>

        <ul class="project-stack">
          <li v-for="item in project.stack" :key="item" class="project-stack-item">
            {{ item }}
          </li>
        </ul>

        <div class="project-links">
          <RouterLink
            class="project-link"
            :to="{ name: 'project-detail', params: { slug: project.slug } }"
          >
            {{ t(detailLabel) }}
          </RouterLink>
        </div>
      </article>
    </div>

    <p v-if="canScrollProjects" class="track-hint">
      {{ t(dragHint) }}
      <span class="track-status">
        {{ isAutoScrollingProjects ? t(autoScrollingLabel) : t(pausedLabel) }}
      </span>
    </p>
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

.project-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(360px, 520px);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.project-track::-webkit-scrollbar {
  height: 10px;
}

.project-track::-webkit-scrollbar-thumb {
  background: rgba(15, 92, 83, 0.22);
  border-radius: 999px;
}

.project-track-active {
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    rgba(0, 0, 0, 1) 3%,
    rgba(0, 0, 0, 1) 97%,
    transparent 100%
  );
}

.project-card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 248, 239, 0.96), rgba(255, 255, 255, 0.82));
  box-shadow: 0 18px 42px rgba(91, 57, 24, 0.08);
}

.project-preview {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  border-radius: 22px;
  border: 1px solid rgba(8, 42, 38, 0.1);
  background: linear-gradient(135deg, #e6f2ec 0%, #f7efe3 100%);
}

.project-preview-forest {
  background: linear-gradient(135deg, #dcefe7 0%, #b7d8c6 50%, #f4eadf 100%);
}

.project-preview-ocean {
  background: linear-gradient(135deg, #d8edf6 0%, #acd6e8 48%, #eef7fb 100%);
}

.project-preview-copper {
  background: linear-gradient(135deg, #f5dfd2 0%, #ddb090 48%, #f8eee8 100%);
}

.project-preview-sunrise {
  background: linear-gradient(135deg, #fae2c7 0%, #f2c08e 45%, #fff5ea 100%);
}

.project-preview-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
}

.project-preview-fallback {
  display: grid;
  align-content: space-between;
  min-height: 220px;
  padding: 1.4rem;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.52), transparent 34%),
    linear-gradient(180deg, rgba(16, 62, 57, 0.02), rgba(16, 62, 57, 0.18));
}

.project-preview-chip {
  width: fit-content;
  padding: 0.42rem 0.72rem;
  border: 1px solid rgba(20, 54, 50, 0.12);
  border-radius: 999px;
  background: rgba(255, 252, 247, 0.72);
  color: rgba(20, 54, 50, 0.74);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-preview-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: 0.7rem;
  align-items: end;
}

.project-preview-block {
  display: block;
  min-height: 3.6rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 10px 18px rgba(20, 54, 50, 0.08);
  backdrop-filter: blur(4px);
}

.project-preview-block-wide {
  min-height: 7rem;
}

.project-preview-block-tall {
  min-height: 4.8rem;
}

.project-head,
.project-summary,
.project-outcome,
.project-detail-figure,
.project-metrics,
.project-stack,
.project-links {
  padding-inline: 0.5rem;
}

.project-category {
  margin: 0 0 0.6rem;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-title {
  margin: 0;
  font-size: 1.45rem;
}

.project-summary,
.project-outcome {
  margin: 0;
  color: #31534f;
  line-height: 1.75;
}

.project-outcome {
  padding-left: 1rem;
  border-left: 3px solid rgba(15, 92, 83, 0.22);
}

.project-detail-figure {
  display: grid;
  gap: 0.7rem;
  margin: 0;
}

.project-detail-image {
  display: block;
  width: 100%;
  border-radius: 20px;
  border: 1px solid rgba(8, 42, 38, 0.1);
  box-shadow: 0 16px 30px rgba(20, 54, 50, 0.08);
}

.project-detail-caption {
  margin: 0;
  color: #6f4d2b;
  font-size: 0.88rem;
}

.project-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin: 0;
}

.project-metric {
  padding: 0.85rem;
  border-radius: 18px;
  background: rgba(242, 224, 199, 0.4);
}

.project-metric-label {
  margin: 0;
  color: #8a4b22;
  font-size: 0.82rem;
}

.project-metric-value {
  margin: 0.35rem 0 0;
  color: #143632;
  font-weight: 600;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-stack-item {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #e4f0ea;
  color: #0f5c53;
  font-size: 0.9rem;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 92, 83, 0.18);
  color: #0f5c53;
  text-decoration: none;
}

.track-hint {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  color: #6b441f;
  font-size: 0.92rem;
}

.track-status {
  color: #0f5c53;
}

@media (max-width: 920px) {
  .project-track {
    grid-auto-columns: minmax(300px, 88vw);
  }
}

@media (max-width: 640px) {
  .project-metrics {
    grid-template-columns: 1fr;
  }

  .track-hint {
    flex-direction: column;
  }
}
</style>

