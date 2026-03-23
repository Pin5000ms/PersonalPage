<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import type { LocalizedText } from '../../data/siteContent'

interface ContentCardItem {
  title: LocalizedText
  summary: LocalizedText
  meta: string
  href: string
  imageLabel: LocalizedText
  imageTone: string
  bulletPoints?: LocalizedText[]
  ctaLabel: string
}

interface Props {
  items: ContentCardItem[]
}

const props = defineProps<Props>()
const { locale } = useLanguage()

function t(text: LocalizedText) {
  return text[locale.value]
}
</script>

<template>
  <section class="content-feed">
    <article
      v-for="item in props.items"
      :key="`${item.meta}-${t(item.title)}`"
      class="content-card"
    >
      <div class="content-media" :class="`content-media-${item.imageTone}`">
        <span class="content-media-label">{{ t(item.imageLabel) }}</span>
      </div>

      <div class="content-body">
        <p class="content-meta">{{ item.meta }}</p>
        <h2 class="content-title">{{ t(item.title) }}</h2>
        <p class="content-summary">{{ t(item.summary) }}</p>

        <ul v-if="item.bulletPoints?.length" class="content-points">
          <li v-for="point in item.bulletPoints" :key="t(point)" class="content-point">
            {{ t(point) }}
          </li>
        </ul>

        <a class="content-link" :href="item.href">{{ item.ctaLabel }}</a>
      </div>
    </article>
  </section>
</template>

<style scoped>
.content-feed {
  display: grid;
  gap: 1.2rem;
}

.content-card {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background: rgba(255, 251, 246, 0.88);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
}

.content-media {
  position: relative;
  min-height: 220px;
  display: flex;
  align-items: flex-end;
  padding: 1.2rem;
  color: #fff8ef;
}

.content-media::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 10%, rgba(12, 30, 27, 0.6) 100%);
}

.content-media-label {
  position: relative;
  z-index: 1;
  font-size: 0.95rem;
  line-height: 1.5;
}

.content-media-sunrise {
  background: linear-gradient(135deg, #f48c6c, #f0c27b 54%, #fbf4d6);
}

.content-media-ocean {
  background: linear-gradient(135deg, #1d7c91, #67b9c7 54%, #d6eef2);
}

.content-media-forest {
  background: linear-gradient(135deg, #2f6e57, #6fab8a 54%, #e2f2e8);
}

.content-media-plum {
  background: linear-gradient(135deg, #6d3d78, #b17ac8 54%, #f4e8fb);
}

.content-media-copper {
  background: linear-gradient(135deg, #8a5337, #d79766 54%, #f8e8dc);
}

.content-body {
  display: grid;
  gap: 0.8rem;
  padding: 1.5rem;
}

.content-meta {
  margin: 0;
  color: #8a4b22;
  font-size: 0.9rem;
}

.content-title {
  margin: 0;
  font-size: 1.45rem;
}

.content-summary {
  margin: 0;
  color: #31534f;
  line-height: 1.8;
}

.content-points {
  margin: 0;
  padding-left: 1.2rem;
  color: #214340;
}

.content-point + .content-point {
  margin-top: 0.5rem;
}

.content-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 92, 83, 0.18);
  color: #0f5c53;
  text-decoration: none;
}

@media (max-width: 760px) {
  .content-card {
    grid-template-columns: 1fr;
  }

  .content-media {
    min-height: 180px;
  }
}
</style>
