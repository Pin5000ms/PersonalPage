<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../../composables/useLanguage'
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
const activeIndex = shallowRef(0)
const isAutoPlaying = shallowRef(true)
let autoplayTimer: number | null = null
let resumeTimer: number | null = null

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
const hasMultipleProjects = computed(() => projectCards.value.length > 1)
const sliderStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * 100}%)`,
}))

function clearAutoplayTimer() {
  if (autoplayTimer !== null) {
    window.clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function clearResumeTimer() {
  if (resumeTimer !== null) {
    window.clearTimeout(resumeTimer)
    resumeTimer = null
  }
}

function startAutoplay() {
  clearAutoplayTimer()

  if (!hasMultipleProjects.value) {
    isAutoPlaying.value = false
    return
  }

  isAutoPlaying.value = true
  autoplayTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % projectCards.value.length
  }, 4200)
}

function pauseAutoplay() {
  isAutoPlaying.value = false
  clearAutoplayTimer()
}

function pauseWithResume() {
  pauseAutoplay()
  clearResumeTimer()

  if (!hasMultipleProjects.value) {
    return
  }

  resumeTimer = window.setTimeout(() => {
    startAutoplay()
  }, 2600)
}

function goToProject(index: number) {
  activeIndex.value = index
  pauseWithResume()
}

watch(
  () => props.items.length,
  (length) => {
    if (length === 0) {
      activeIndex.value = 0
      pauseAutoplay()
      return
    }

    if (activeIndex.value >= length) {
      activeIndex.value = 0
    }

    startAutoplay()
  },
  { immediate: true },
)

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  clearAutoplayTimer()
  clearResumeTimer()
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
      class="project-carousel"
      @mouseenter="pauseAutoplay"
      @mouseleave="pauseWithResume"
      @touchstart.passive="pauseWithResume"
      @focusin="pauseWithResume"
    >
      <div class="project-slider" :style="sliderStyle">
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
    </div>

    <div v-if="hasMultipleProjects" class="carousel-footer">
      <div class="carousel-dots" role="tablist" :aria-label="t(title)">
        <button
          v-for="(project, index) in projectCards"
          :key="project.slug"
          class="carousel-dot"
          :class="{ 'carousel-dot-active': index === activeIndex }"
          type="button"
          :aria-label="`${t(project.title)} ${index + 1}`"
          :aria-pressed="index === activeIndex"
          @click="goToProject(index)"
        />
      </div>

      <p class="track-hint">
        <span>{{ t(dragHint) }}</span>
        <span class="track-status">
          {{ isAutoPlaying ? t(autoScrollingLabel) : t(pausedLabel) }}
        </span>
      </p>
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

.project-carousel {
  overflow: hidden;
}

.project-slider {
  display: flex;
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.project-card {
  flex: 0 0 100%;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 248, 239, 0.96), rgba(255, 255, 255, 0.82));
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-stack-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid rgba(15, 92, 83, 0.12);
  border-radius: 18px;
  background: rgba(228, 240, 234, 0.8);
  color: #0f5c53;
  font-size: 0.9rem;
  line-height: 1.35;
  text-align: center;
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

.carousel-footer {
  display: grid;
  gap: 0.9rem;
  justify-items: center;
}

.carousel-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 248, 239, 0.84);
  box-shadow: 0 14px 28px rgba(91, 57, 24, 0.08);
}

.carousel-dot {
  width: 0.82rem;
  height: 0.82rem;
  border: 0;
  border-radius: 999px;
  background: rgba(15, 92, 83, 0.2);
  cursor: pointer;
  transition: transform 180ms ease, background-color 180ms ease, width 220ms ease;
}

.carousel-dot:hover {
  transform: scale(1.08);
}

.carousel-dot-active {
  width: 2rem;
  background: #0f5c53;
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

@media (max-width: 640px) {
  .project-metrics {
    grid-template-columns: 1fr;
  }

  .project-stack {
    grid-template-columns: 1fr;
  }

  .track-hint {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
