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
      <p class="page-description">
        這裡整理我把實作過程、踩坑經驗與架構思考寫成文章的內容，維持作品集之外的長期輸出。
      </p>
    </section>

    <section class="article-grid">
      <RouterLink
        v-for="article in articleCards"
        :key="article.slug"
        class="article-card"
        :to="`/articles/${article.slug}`"
      >
        <div class="article-card-top">
          <p class="article-date">{{ article.formattedDate }}</p>
          <span class="article-reading">{{ article.readingMinutes }} min</span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-summary">{{ article.summary }}</p>
        <ul class="tag-list">
          <li v-for="tag in article.tags" :key="tag" class="tag-item">
            {{ tag }}
          </li>
        </ul>
        <p class="article-link">繼續閱讀</p>
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 3.25rem;
}

.page-intro {
  max-width: 62ch;
  padding-top: 0.6rem;
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
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05;
}

.page-description {
  margin: 1.25rem 0 0;
  color: var(--color-text-muted);
  line-height: 1.9;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.article-card {
  display: grid;
  gap: 1rem;
  padding: 1.6rem;
  border: 1px solid var(--color-line);
  border-radius: 1.7rem;
  background:
    radial-gradient(circle at top right, rgba(223, 234, 228, 0.28), transparent 30%),
    linear-gradient(180deg, rgba(252, 250, 245, 0.94), rgba(246, 242, 234, 0.9));
  box-shadow: var(--shadow-soft);
  text-decoration: none;
  transition:
    transform 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease,
    background-color 240ms ease;
}

.article-card:hover {
  transform: translateY(-3px);
  border-color: rgba(95, 125, 118, 0.2);
  box-shadow: 0 28px 48px rgba(88, 104, 97, 0.12);
}

.article-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.article-date {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.article-reading {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.2rem 0.7rem;
  border: 1px solid rgba(183, 141, 100, 0.18);
  border-radius: 999px;
  background: rgba(250, 246, 239, 0.84);
  color: var(--color-accent);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.article-title {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 3vw, 1.95rem);
  line-height: 1.28;
  transition: color 220ms ease;
}

.article-card:hover .article-title {
  color: var(--color-primary-deep);
}

.article-summary {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.85;
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
  --pill-border-color: rgba(183, 141, 100, 0.2);
  --pill-background: rgba(250, 246, 239, 0.92);
  --pill-background-hover: rgba(245, 240, 231, 0.98);
  --pill-text: #876648;
  font-size: 0.85rem;
}

.article-link {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  width: fit-content;
  min-width: 11.5rem;
  margin: 0.75rem 0 0;
  padding: 0.82rem 1rem;
  border: 1px solid rgba(95, 125, 118, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: var(--color-primary-deep);
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 10px 18px rgba(88, 104, 97, 0.08);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    box-shadow 220ms ease;
}

.article-link::after {
  content: "→";
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 999px;
  background: rgba(95, 125, 118, 0.1);
  font-size: 0.95rem;
  transition: transform 220ms ease, background-color 220ms ease;
}

.article-card:hover .article-link {
  transform: translateY(-1px);
  border-color: rgba(95, 125, 118, 0.24);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 24px rgba(88, 104, 97, 0.12);
}

.article-card:hover .article-link::after {
  transform: translateX(2px);
  background: rgba(95, 125, 118, 0.16);
}

@media (max-width: 860px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .view-shell {
    gap: 2.5rem;
  }

  .page-title {
    font-size: clamp(2.1rem, 11vw, 3rem);
  }

  .article-card {
    padding: 1.3rem;
    border-radius: 1.4rem;
  }

  .article-card-top {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
