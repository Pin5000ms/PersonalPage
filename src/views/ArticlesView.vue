<script setup lang="ts">
import { computed } from 'vue'
import ContentFeed from '../components/content/ContentFeed.vue'
import { articles } from '../data/siteContent'

const contentItems = computed(() =>
  articles.map((article) => ({
    title: article.title,
    summary: article.summary,
    meta: `${article.publishDate} · ${article.readingTime.zh}`,
    href: article.href,
    imageLabel: article.imageLabel,
    imageTone: article.imageTone,
    ctaLabel: '閱讀文章',
  })),
)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Technical writing</p>
      <h1 class="page-title">技術分享文章</h1>
      <p class="page-description">
        這裡收錄我把實作經驗整理成文章的內容。
      </p>
    </section>

    <ContentFeed :items="contentItems" />
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 2rem;
}

.page-intro {
  max-width: 56ch;
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
</style>
