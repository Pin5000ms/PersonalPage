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
  gap: 2.6rem;
}

.article-hero {
  display: grid;
  gap: 0.95rem;
  max-width: 72ch;
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

.article-kicker {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.article-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 5vw, 4.1rem);
  line-height: 1.08;
}

.article-summary {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.9;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  color: var(--color-text-muted);
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
  --pill-border-color: rgba(183, 141, 100, 0.2);
  --pill-background: rgba(250, 246, 239, 0.92);
  --pill-background-hover: rgba(245, 240, 231, 0.98);
  --pill-text: #876648;
}

.article-content {
  max-width: 72ch;
  padding: 2rem;
  border: 1px solid var(--color-line);
  border-radius: 2rem;
  background:
    radial-gradient(circle at top right, rgba(223, 234, 228, 0.22), transparent 28%),
    linear-gradient(180deg, rgba(252, 250, 245, 0.94), rgba(246, 242, 234, 0.9));
  box-shadow: var(--shadow-soft);
  color: var(--color-text);
  line-height: 1.95;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3) {
  margin: 2.5rem 0 0.85rem;
  color: var(--color-text);
  font-family: var(--font-display);
  line-height: 1.24;
}

.article-content :deep(h1) {
  font-size: clamp(2rem, 4vw, 2.6rem);
}

.article-content :deep(h2) {
  font-size: clamp(1.6rem, 3vw, 2rem);
}

.article-content :deep(h3) {
  font-size: clamp(1.3rem, 2.4vw, 1.55rem);
}

.article-content :deep(p) {
  margin: 0 0 1.15rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 1.35rem;
  padding-left: 1.35rem;
}

.article-content :deep(li) {
  margin: 0.4rem 0;
}

.article-content :deep(code) {
  padding: 0.14rem 0.38rem;
  border-radius: 0.45rem;
  background: rgba(95, 125, 118, 0.08);
  font-family: 'Cascadia Code', Consolas, monospace;
  font-size: 0.92em;
}

.article-content :deep(pre) {
  overflow-x: auto;
  margin: 1.5rem 0;
  padding: 1.15rem 1.25rem;
  border: 1px solid rgba(95, 125, 118, 0.16);
  border-radius: 1.2rem;
  background: linear-gradient(180deg, #566f69, #445c56);
  color: #f4f0e8;
  box-shadow: 0 18px 30px rgba(88, 104, 97, 0.12);
}

.article-content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: inherit;
}

.article-content :deep(figure) {
  margin: 1.8rem 0;
}

.article-content :deep(img) {
  width: 100%;
  border-radius: 1.4rem;
  border: 1px solid rgba(95, 125, 118, 0.12);
  box-shadow: 0 18px 38px rgba(88, 104, 97, 0.08);
}

.article-content :deep(a) {
  color: var(--color-primary-deep);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
}

@media (max-width: 720px) {
  .article-shell {
    gap: 2rem;
  }

  .article-title {
    font-size: clamp(2rem, 11vw, 2.9rem);
  }

  .article-content {
    padding: 1.3rem;
    border-radius: 1.5rem;
  }
}
</style>
