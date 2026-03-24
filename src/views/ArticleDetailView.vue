<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getArticleBySlug } from '../content/articles'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const slug = typeof route.params.slug === 'string' ? route.params.slug : ''
  return getArticleBySlug(slug)
})

watchEffect(() => {
  if (!article.value) {
    router.replace('/articles')
    return
  }

  document.title = `${article.value.title} | Tom Chang`
})

const formattedDate = computed(() => {
  if (!article.value) {
    return ''
  }

  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.value.date))
})
</script>

<template>
  <div v-if="article" class="article-shell">
    <section class="article-hero">
      <RouterLink class="back-link" to="/articles">返回文章列表</RouterLink>
      <p class="article-kicker">Technical article</p>
      <h1 class="article-title">{{ article.title }}</h1>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-meta">
        <span>{{ formattedDate }}</span>
        <span>{{ article.readingMinutes }} 分鐘閱讀</span>
      </div>
      <ul class="tag-list">
        <li v-for="tag in article.tags" :key="tag" class="tag-item">
          {{ tag }}
        </li>
      </ul>
    </section>

    <article class="article-content" v-html="article.html" />
  </div>
</template>

<style scoped>
.article-shell {
  display: grid;
  gap: 2rem;
}

.article-hero {
  display: grid;
  gap: 0.9rem;
  max-width: 72ch;
}

.back-link {
  width: fit-content;
  color: #8a4b22;
  text-decoration: none;
  font-weight: 600;
}

.article-kicker {
  margin: 0;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.article-title {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 1.05;
}

.article-summary {
  margin: 0;
  color: #31534f;
  line-height: 1.8;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  color: #5c6f6a;
  font-size: 0.95rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tag-item {
  --pill-border-color: rgba(138, 75, 34, 0.14);
  --pill-background: rgba(138, 75, 34, 0.08);
  --pill-background-hover: rgba(138, 75, 34, 0.14);
  --pill-text: #8a4b22;
}

.article-content {
  max-width: 72ch;
  color: #1f302d;
  line-height: 1.9;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin: 2rem 0 0.75rem;
  line-height: 1.2;
}

.article-content :deep(p) {
  margin: 0 0 1rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 1.25rem;
  padding-left: 1.25rem;
}

.article-content :deep(li) {
  margin: 0.35rem 0;
}

.article-content :deep(code) {
  padding: 0.12rem 0.35rem;
  border-radius: 0.35rem;
  background: rgba(49, 83, 79, 0.08);
  font-family: 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
}

.article-content :deep(pre) {
  overflow-x: auto;
  padding: 1rem 1.15rem;
  border-radius: 1rem;
  background: #16302c;
  color: #f4f0e8;
}

.article-content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: inherit;
}

.article-content :deep(figure) {
  margin: 1.5rem 0;
}

.article-content :deep(img) {
  width: 100%;
  border-radius: 1.2rem;
  border: 1px solid rgba(8, 42, 38, 0.1);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.08);
}

.article-content :deep(a) {
  color: #8a4b22;
}

@media (max-width: 720px) {
  .article-title {
    font-size: clamp(2rem, 11vw, 2.8rem);
  }
}
</style>
