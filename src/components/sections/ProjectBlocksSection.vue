<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLanguage } from '../../composables/useLanguage'
import type { LocalizedText, ProjectItem } from '../../data/siteContent'

interface Props {
  items: ProjectItem[]
  kicker: LocalizedText
  title: LocalizedText
  description: LocalizedText
  aiTitle: LocalizedText
  otherTitle: LocalizedText
  detailLabel: LocalizedText
}

const props = defineProps<Props>()
const { locale } = useLanguage()

function t(text?: LocalizedText) {
  return text?.[locale.value] ?? ''
}

const aiProjects = computed(() => props.items.filter((item) => item.group === 'ai'))
const otherProjects = computed(() => props.items.filter((item) => item.group === 'other'))

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
</script>

<template>
  <section class="projects-blocks">
    <div class="section-heading">
      <p class="section-kicker">{{ t(kicker) }}</p>
      <h2 class="section-title">{{ t(title) }}</h2>
      <p class="section-description">{{ t(description) }}</p>
    </div>

    <div class="group-list">
      <section v-if="aiProjects.length" class="group-section">
        <header class="group-heading">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 3 4 7v6c0 4.42 3.58 8 8 8s8-3.58 8-8V7l-8-4Zm0 2.18 5.5 2.75V13A5.5 5.5 0 1 1 6.5 13V7.93L12 5.18Zm-2.5 4.57a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM9 15.2c.72.87 1.74 1.3 3 1.3s2.28-.43 3-1.3" />
            </svg>
          </span>
          <h3 class="group-title">{{ t(aiTitle) }}</h3>
        </header>

        <article
          v-for="project in aiProjects"
          :key="project.slug"
          class="project-block"
        >
          <div class="project-media">
            <div class="project-preview" :class="getProjectToneClass(project.coverImageTone)">
              <img
                v-if="project.coverImageSrc"
                class="project-preview-image"
                :src="project.coverImageSrc"
                :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
                loading="lazy"
              />
            </div>

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
          </div>

          <div class="project-content">
            <div class="project-head">
              <p class="project-category">{{ t(project.category) }}</p>
              <h4 class="project-title">{{ t(project.title) }}</h4>
            </div>

            <p class="project-summary">{{ t(project.summary) }}</p>
            <p class="project-outcome">{{ t(project.outcome) }}</p>

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
          </div>
        </article>
      </section>

      <section v-if="otherProjects.length" class="group-section">
        <header class="group-heading">
          <span class="group-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M5 4.75A2.75 2.75 0 0 1 7.75 2h8.5A2.75 2.75 0 0 1 19 4.75v14.5A2.75 2.75 0 0 1 16.25 22h-8.5A2.75 2.75 0 0 1 5 19.25V4.75Zm2.75-.75a.75.75 0 0 0-.75.75v14.5c0 .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75V4.75a.75.75 0 0 0-.75-.75h-8.5ZM9 7.5h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm0 4h6a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Zm0 4h3.5a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2Z" />
            </svg>
          </span>
          <h3 class="group-title">{{ t(otherTitle) }}</h3>
        </header>

        <article
          v-for="project in otherProjects"
          :key="project.slug"
          class="project-block"
        >
          <div class="project-media">
            <div class="project-preview" :class="getProjectToneClass(project.coverImageTone)">
              <img
                v-if="project.coverImageSrc"
                class="project-preview-image"
                :src="project.coverImageSrc"
                :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
                loading="lazy"
              />
            </div>

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
          </div>

          <div class="project-content">
            <div class="project-head">
              <p class="project-category">{{ t(project.category) }}</p>
              <h4 class="project-title">{{ t(project.title) }}</h4>
            </div>

            <p class="project-summary">{{ t(project.summary) }}</p>
            <p class="project-outcome">{{ t(project.outcome) }}</p>

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
          </div>
        </article>
      </section>
    </div>
  </section>
</template>

<style scoped>
.projects-blocks {
  display: grid;
  gap: 1.75rem;
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

.group-list {
  display: grid;
  gap: 1.5rem;
}

.group-section {
  display: grid;
  gap: 1rem;
}

.group-heading {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.group-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(228, 240, 234, 0.96), rgba(243, 232, 216, 0.92));
  color: #0f5c53;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.group-icon svg {
  width: 1.15rem;
  height: 1.15rem;
  fill: currentColor;
}

.group-title {
  margin: 0;
  font-size: 1.3rem;
  color: #143632;
}

.project-block {
  display: grid;
  grid-template-columns: minmax(300px, 0.95fr) minmax(0, 1.15fr);
  gap: 1.25rem;
  padding: 1rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 248, 239, 0.96), rgba(255, 255, 255, 0.82));
  box-shadow: 0 18px 42px rgba(91, 57, 24, 0.08);
}

.project-media,
.project-content {
  display: grid;
  gap: 1rem;
  min-width: 0;
}

.project-preview {
  position: relative;
  overflow: hidden;
  min-height: 250px;
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
  min-height: 250px;
  object-fit: cover;
}

.project-head {
  display: grid;
  gap: 0.45rem;
}

.project-category {
  margin: 0;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-title {
  margin: 0;
  font-size: 1.55rem;
  color: #143632;
}

.project-summary,
.project-outcome {
  margin: 0;
  color: #31534f;
  line-height: 1.78;
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

@media (max-width: 980px) {
  .project-block {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project-metrics,
  .project-stack {
    grid-template-columns: 1fr;
  }
}
</style>
