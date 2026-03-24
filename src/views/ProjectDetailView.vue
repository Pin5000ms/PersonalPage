<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'
import { getProjectBySlug } from '../data/siteContent'

const route = useRoute()
const { locale } = useLanguage()

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const project = computed(() => getProjectBySlug(String(route.params.slug ?? '')))
</script>

<template>
  <div v-if="project" class="view-shell">
    <RouterLink class="back-link" to="/projects">
      {{ locale === 'zh' ? '返回作品列表' : 'Back to projects' }}
    </RouterLink>

    <section class="page-intro">
      <p class="page-kicker">{{ t(project.category) }}</p>
      <h1 class="page-title">{{ t(project.title) }}</h1>
      <p class="page-description">{{ t(project.summary) }}</p>
    </section>

    <section class="hero-cover" :class="`hero-cover-${project.coverImageTone ?? 'forest'}`">
      <div class="hero-cover-frame">
        <span class="hero-cover-crest">{{ t(project.category) }}</span>
        <div class="hero-cover-surface">
          <img
            v-if="project.coverImageSrc"
            class="hero-image"
            :src="project.coverImageSrc"
            :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
          />
        </div>
      </div>
    </section>

    <section class="detail-grid">
      <article class="detail-card">
        <h2 class="detail-title">{{ locale === 'zh' ? '專案說明' : 'Project overview' }}</h2>
        <p class="detail-text">{{ t(project.outcome) }}</p>
      </article>

      <article class="detail-card">
        <h2 class="detail-title">{{ locale === 'zh' ? '技術堆疊' : 'Tech stack' }}</h2>
        <ul class="stack-list">
          <li v-for="item in project.stack" :key="item" class="stack-item">{{ item }}</li>
        </ul>
      </article>
    </section>

    <section class="metrics-grid">
      <article
        v-for="metric in project.metrics"
        :key="t(metric.label)"
        class="metric-card"
      >
        <p class="metric-label">{{ t(metric.label) }}</p>
        <p class="metric-value">{{ t(metric.value) }}</p>
      </article>
    </section>

    <figure v-if="project.detailImageSrc" class="detail-figure">
      <div class="detail-image-frame">
        <img
          class="detail-image"
          :src="project.detailImageSrc"
          :alt="project.detailImageAlt ? t(project.detailImageAlt) : t(project.title)"
        />
      </div>
      <figcaption v-if="project.detailImageAlt" class="detail-caption">
        {{ t(project.detailImageAlt) }}
      </figcaption>
    </figure>
  </div>

  <div v-else class="empty-state">
    <p>{{ locale === 'zh' ? '找不到這個專案。' : 'Project not found.' }}</p>
    <RouterLink class="back-link" to="/projects">
      {{ locale === 'zh' ? '返回作品列表' : 'Back to projects' }}
    </RouterLink>
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 2.4rem;
}

.back-link {
  width: fit-content;
  padding: 0.78rem 1.08rem;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: rgba(250, 247, 241, 0.9);
  color: var(--color-primary-deep);
  text-decoration: none;
  box-shadow: var(--shadow-soft);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.back-link:hover {
  transform: translateY(-1px);
  border-color: rgba(95, 125, 118, 0.22);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 14px 24px rgba(88, 104, 97, 0.1);
}

.page-intro {
  max-width: 64ch;
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
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  line-height: 1.06;
}

.page-description,
.detail-text {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.9;
}

.page-description {
  margin-top: 1.25rem;
}

.hero-cover {
  position: relative;
  overflow: hidden;
  min-height: 28rem;
  padding: 1rem;
  border: 1px solid var(--color-line);
  border-radius: 32px;
  box-shadow: var(--shadow-card);
}

.hero-cover::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.24), transparent 26%),
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.32), transparent 30%);
  pointer-events: none;
}

.hero-cover-forest {
  background: linear-gradient(135deg, #e6eeea 0%, #c8d8d1 48%, #f2ede4 100%);
}

.hero-cover-ocean {
  background: linear-gradient(135deg, #e6efef 0%, #c4d5d4 48%, #f2f5f1 100%);
}

.hero-cover-copper {
  background: linear-gradient(135deg, #f2e8df 0%, #d8c1a8 48%, #f6f1e9 100%);
}

.hero-cover-sunrise {
  background: linear-gradient(135deg, #f1eadf 0%, #ddcdb6 45%, #faf6ef 100%);
}

.hero-cover-frame {
  position: relative;
  display: grid;
  min-height: 100%;
  height: 100%;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 24px;
  background: rgba(255, 252, 247, 0.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.42),
    0 14px 24px rgba(88, 104, 97, 0.08);
}

.hero-cover-surface {
  position: relative;
  overflow: hidden;
  min-height: 100%;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
}

.hero-cover-surface::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 40%;
  background: linear-gradient(180deg, transparent, rgba(38, 57, 54, 0.12));
  pointer-events: none;
}

.hero-cover-crest {
  position: absolute;
  top: 1.35rem;
  left: 1.35rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: 999px;
  background: rgba(250, 247, 241, 0.72);
  backdrop-filter: blur(6px);
  color: rgba(68, 92, 86, 0.88);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-image,
.detail-image {
  display: block;
  width: 100%;
}

.hero-image {
  min-height: 28rem;
  height: 100%;
  object-fit: cover;
  transform: scale(1.01);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms ease;
}

.hero-cover:hover .hero-image {
  transform: scale(1.03);
  filter: saturate(0.94) contrast(1.02);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.9fr);
  gap: 1.2rem;
}

.detail-card,
.metric-card {
  padding: 1.5rem;
  border: 1px solid var(--color-line);
  border-radius: 26px;
  background: rgba(252, 250, 245, 0.9);
  box-shadow: var(--shadow-soft);
}

.detail-title {
  margin: 0 0 0.85rem;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack-item {
  --pill-border-color: rgba(95, 125, 118, 0.16);
  --pill-background: rgba(235, 241, 237, 0.82);
  --pill-background-hover: rgba(242, 246, 243, 0.94);
  --pill-text: var(--color-primary-deep);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.metric-label {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
}

.metric-value {
  margin: 0.55rem 0 0;
  color: var(--color-text);
  font-size: 1.02rem;
  font-weight: 700;
}

.detail-figure {
  display: grid;
  gap: 0.8rem;
  margin: 0;
}

.detail-image-frame {
  overflow: hidden;
  padding: 0.8rem;
  border: 1px solid var(--color-line);
  border-radius: 28px;
  background: rgba(252, 250, 245, 0.88);
  box-shadow: var(--shadow-soft);
}

.detail-image {
  border-radius: 20px;
  border: 1px solid rgba(95, 125, 118, 0.12);
  box-shadow: 0 16px 30px rgba(88, 104, 97, 0.08);
  transition:
    transform 320ms ease,
    box-shadow 320ms ease,
    border-color 320ms ease;
}

.detail-image:hover {
  transform: translateY(-2px);
  border-color: rgba(95, 125, 118, 0.18);
  box-shadow: 0 22px 34px rgba(88, 104, 97, 0.12);
}

.detail-caption {
  color: var(--color-accent);
  font-size: 0.9rem;
}

.empty-state {
  display: grid;
  gap: 1rem;
  justify-items: start;
}

@media (max-width: 860px) {
  .view-shell {
    gap: 1.75rem;
  }

  .hero-cover {
    min-height: 18rem;
  }

  .hero-image {
    min-height: 18rem;
  }

  .detail-grid,
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
