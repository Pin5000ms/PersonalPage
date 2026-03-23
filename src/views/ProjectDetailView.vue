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
      {{ locale === 'zh' ? '返回作品集' : 'Back to projects' }}
    </RouterLink>

    <section class="page-intro">
      <p class="page-kicker">{{ t(project.category) }}</p>
      <h1 class="page-title">{{ t(project.title) }}</h1>
      <p class="page-description">{{ t(project.summary) }}</p>
    </section>

    <img
      v-if="project.coverImageSrc"
      class="hero-image"
      :src="project.coverImageSrc"
      :alt="project.coverImageAlt ? t(project.coverImageAlt) : t(project.title)"
    />

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
      <img
        class="detail-image"
        :src="project.detailImageSrc"
        :alt="project.detailImageAlt ? t(project.detailImageAlt) : t(project.title)"
      />
      <figcaption v-if="project.detailImageAlt" class="detail-caption">
        {{ t(project.detailImageAlt) }}
      </figcaption>
    </figure>
  </div>

  <div v-else class="empty-state">
    <p>{{ locale === 'zh' ? '找不到這個專案。' : 'Project not found.' }}</p>
    <RouterLink class="back-link" to="/projects">
      {{ locale === 'zh' ? '返回作品集' : 'Back to projects' }}
    </RouterLink>
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 1.5rem;
}

.back-link {
  width: fit-content;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  background: rgba(255, 248, 239, 0.9);
  color: #0f5c53;
  text-decoration: none;
  box-shadow: 0 12px 24px rgba(91, 57, 24, 0.08);
}

.page-intro {
  max-width: 68ch;
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
  line-height: 1.05;
}

.page-description,
.detail-text {
  margin: 0;
  color: #31534f;
  line-height: 1.8;
}

.hero-image,
.detail-image {
  display: block;
  width: 100%;
  border-radius: 28px;
  border: 1px solid rgba(8, 42, 38, 0.1);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.08);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.9fr);
  gap: 1rem;
}

.detail-card,
.metric-card {
  padding: 1.35rem;
  border: 1px solid rgba(8, 42, 38, 0.1);
  border-radius: 24px;
  background: rgba(255, 251, 246, 0.88);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
}

.detail-title {
  margin: 0 0 0.8rem;
  color: #143632;
  font-size: 1.1rem;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.stack-item {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #e4f0ea;
  color: #0f5c53;
  font-size: 0.9rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.metric-label {
  margin: 0;
  color: #8a4b22;
  font-size: 0.82rem;
}

.metric-value {
  margin: 0.45rem 0 0;
  color: #143632;
  font-size: 1.02rem;
  font-weight: 700;
}

.detail-figure {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.detail-caption {
  color: #6f4d2b;
  font-size: 0.9rem;
}

.empty-state {
  display: grid;
  gap: 1rem;
  justify-items: start;
}

@media (max-width: 860px) {
  .detail-grid,
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
