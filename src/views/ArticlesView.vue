<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { articles } from '../content/articles'

const articleCards = computed(() =>
  articles.map((article) => ({
    ...article,
    formattedDate: new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(article.date)),
  })),
)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Technical writing</p>
      <h1 class="page-title">技術分享文章</h1>
      <p class="page-description">這裡收錄我把實作經驗整理成文章的內容。</p>
    </section>

    <section class="article-grid">
      <RouterLink
        v-for="article in articleCards"
        :key="article.slug"
        class="article-card"
        :to="`/articles/${article.slug}`"
      >
        <p class="article-date">{{ article.formattedDate }}</p>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">{{ article.summary }}</p>
        <ul class="tag-list">
          <li v-for="tag in article.tags" :key="tag" class="tag-item">
            {{ tag }}
          </li>
        </ul>
        <p class="article-link">Read article</p>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 2rem;
}

.page-intro {
  max-width: 60ch;
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
  line-height: 1;
}

.page-description {
  margin: 1rem 0 0;
  color: #31534f;
  line-height: 1.8;
}

.article-grid {
  display: grid;
  gap: 1.25rem;
}

.article-card {
  display: grid;
  gap: 0.85rem;
  padding: 1.4rem;
  border: 1px solid rgba(49, 83, 79, 0.12);
  border-radius: 1.4rem;
  background: rgba(255, 250, 242, 0.88);
  text-decoration: none;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.article-card:hover {
  transform: translateY(-2px);
  border-color: rgba(138, 75, 34, 0.3);
  box-shadow: 0 20px 40px rgba(31, 48, 45, 0.08);
}

.article-date {
  margin: 0;
  color: #5c6f6a;
  font-size: 0.92rem;
}

.article-title {
  margin: 0;
  color: #1f302d;
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  line-height: 1.2;
}

.article-summary {
  margin: 0;
  color: #31534f;
  line-height: 1.8;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag-item {
  --pill-border-color: rgba(138, 75, 34, 0.14);
  --pill-background: rgba(138, 75, 34, 0.08);
  --pill-background-hover: rgba(138, 75, 34, 0.14);
  --pill-text: #8a4b22;
  font-size: 0.85rem;
}

.article-link {
  margin: 0.35rem 0 0;
  color: #8a4b22;
  font-weight: 600;
}
</style>
