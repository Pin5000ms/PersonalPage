<script setup lang="ts">
import { computed } from 'vue'
import type { ArticleItem } from '../../data/siteContent'

interface Props {
  items: ArticleItem[]
}

const props = defineProps<Props>()

const articleCards = computed(() => props.items)
</script>

<template>
  <section class="articles" id="articles">
    <div class="section-heading">
      <p class="section-kicker">Technical writing</p>
      <h2 class="section-title">從文章累積流量，再把信任轉成持續回訪</h2>
      <p class="section-description">
        技術文章會是作品集的延伸說明書，幫助讀者更理解你的思考方式與實作深度。
      </p>
    </div>

    <div class="article-list">
      <article
        v-for="article in articleCards"
        :key="article.title"
        class="article-card"
      >
        <p class="article-meta">
          <span>{{ article.publishDate }}</span>
          <span>{{ article.readingTime }}</span>
        </p>
        <h3 class="article-title">{{ article.title }}</h3>
        <p class="article-summary">{{ article.summary }}</p>
        <a class="article-link" :href="article.href">Read article</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.articles {
  display: grid;
  gap: 1.5rem;
}

.section-heading {
  max-width: 58ch;
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

.article-list {
  display: grid;
  gap: 1rem;
}

.article-card {
  padding: 1.4rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 24px;
  background: rgba(255, 251, 246, 0.88);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin: 0 0 0.8rem;
  color: #8a4b22;
  font-size: 0.9rem;
}

.article-title {
  margin: 0;
  font-size: 1.35rem;
}

.article-summary {
  margin: 0.8rem 0 1rem;
  color: #31534f;
  line-height: 1.7;
}

.article-link {
  color: #0f5c53;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.18em;
}
</style>
