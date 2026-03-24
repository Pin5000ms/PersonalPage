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
              <div class="project-preview-frame">
                <span class="project-preview-crest">{{ t(project.category) }}</span>
                <div class="project-preview-surface">
                  <img
                    v-if="project.coverImageSrc"
                    class="project-preview-image"
                    :src="project.coverImageSrc"
                    :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
                    loading="lazy"
                  />
                </div>
              </div>
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
              <div class="project-preview-frame">
                <span class="project-preview-crest">{{ t(project.category) }}</span>
                <div class="project-preview-surface">
                  <img
                    v-if="project.coverImageSrc"
                    class="project-preview-image"
                    :src="project.coverImageSrc"
                    :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
                    loading="lazy"
                  />
                </div>
              </div>
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
  color: var(--color-accent);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-description {
  margin: 1rem 0 0;
  color: var(--color-text-muted);
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
  background: linear-gradient(180deg, rgba(236, 241, 237, 0.96), rgba(245, 239, 230, 0.92));
  color: var(--color-primary-deep);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.group-icon svg {
  width: 1.15rem;
  height: 1.15rem;
  fill: currentColor;
}

.group-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-text);
}

.project-block {
  display: grid;
  grid-template-columns: minmax(300px, 0.95fr) minmax(0, 1.15fr);
  gap: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--color-line);
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(252, 250, 245, 0.96), rgba(246, 242, 234, 0.88));
  box-shadow: var(--shadow-card);
  transition:
    transform 260ms ease,
    border-color 260ms ease,
    box-shadow 260ms ease;
}

.project-block:hover {
  transform: translateY(-2px);
  border-color: rgba(95, 125, 118, 0.2);
  box-shadow: 0 30px 52px rgba(88, 104, 97, 0.12);
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
  border: 1px solid rgba(95, 125, 118, 0.1);
  background: linear-gradient(135deg, #e8efeb 0%, #f4eee4 100%);
  padding: 0.9rem;
}

.project-preview::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), transparent 26%),
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.38), transparent 30%);
  pointer-events: none;
}

.project-preview-frame {
  position: relative;
  display: grid;
  min-height: 250px;
  height: 100%;
  padding: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 18px;
  background: rgba(255, 252, 247, 0.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.42),
    0 14px 24px rgba(88, 104, 97, 0.08);
}

.project-preview-surface {
  position: relative;
  overflow: hidden;
  min-height: 100%;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.18);
}

.project-preview-surface::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 42%;
  background: linear-gradient(180deg, transparent, rgba(38, 57, 54, 0.1));
  pointer-events: none;
}

.project-preview-crest {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.72rem;
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: 999px;
  background: rgba(250, 247, 241, 0.7);
  backdrop-filter: blur(6px);
  color: rgba(68, 92, 86, 0.88);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-preview-forest {
  background: linear-gradient(135deg, #e6eeea 0%, #c8d8d1 48%, #f2ede4 100%);
}

.project-preview-ocean {
  background: linear-gradient(135deg, #e6efef 0%, #c4d5d4 48%, #f2f5f1 100%);
}

.project-preview-copper {
  background: linear-gradient(135deg, #f2e8df 0%, #d8c1a8 48%, #f6f1e9 100%);
}

.project-preview-sunrise {
  background: linear-gradient(135deg, #f1eadf 0%, #ddcdb6 45%, #faf6ef 100%);
}

.project-preview-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 250px;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms ease;
}

.project-block:hover .project-preview-image {
  transform: scale(1.04);
  filter: saturate(0.94) contrast(1.02);
}

.project-head {
  display: grid;
  gap: 0.45rem;
}

.project-category {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.55rem;
  color: var(--color-text);
  line-height: 1.28;
  transition: color 220ms ease;
}

.project-block:hover .project-title {
  color: var(--color-primary-deep);
}

.project-summary,
.project-outcome {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.78;
}

.project-outcome {
  padding-left: 1rem;
  border-left: 3px solid rgba(95, 125, 118, 0.24);
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
  border: 1px solid rgba(95, 125, 118, 0.12);
  box-shadow: 0 16px 30px rgba(88, 104, 97, 0.08);
  transition:
    transform 320ms ease,
    box-shadow 320ms ease,
    border-color 320ms ease;
}

.project-detail-image:hover {
  transform: translateY(-2px);
  border-color: rgba(95, 125, 118, 0.18);
  box-shadow: 0 22px 34px rgba(88, 104, 97, 0.12);
}

.project-detail-caption {
  margin: 0;
  color: var(--color-accent);
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
  background: rgba(239, 231, 219, 0.72);
}

.project-metric-label {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
}

.project-metric-value {
  margin: 0.35rem 0 0;
  color: var(--color-text);
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
  --pill-border-color: rgba(95, 125, 118, 0.16);
  --pill-background: rgba(235, 241, 237, 0.82);
  --pill-background-hover: rgba(242, 246, 243, 0.94);
  --pill-text: var(--color-primary-deep);
  border-radius: 18px;
  line-height: 1.35;
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
  border: 1px solid var(--color-line-strong);
  background: rgba(255, 255, 255, 0.48);
  color: var(--color-primary-deep);
  text-decoration: none;
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.project-link:hover {
  transform: translateY(-1px);
  border-color: rgba(95, 125, 118, 0.24);
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 12px 18px rgba(88, 104, 97, 0.1);
}

@media (max-width: 980px) {
  .project-block {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project-block {
    gap: 1rem;
    padding: 0.8rem;
  }

  .project-preview {
    padding: 0.7rem;
    min-height: 210px;
  }

  .project-preview-frame {
    min-height: 210px;
    padding: 0.5rem;
  }

  .project-preview-surface,
  .project-preview-image {
    min-height: 210px;
  }

  .project-preview-crest {
    top: 0.85rem;
    left: 0.85rem;
    font-size: 0.64rem;
  }

  .project-metrics,
  .project-stack {
    grid-template-columns: 1fr;
  }
}
</style>
