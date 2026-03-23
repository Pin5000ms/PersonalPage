<script setup lang="ts">
import { articles } from '../data/siteContent'
import ArticlesSection from '../components/sections/ArticlesSection.vue'
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Technical writing</p>
      <h1 class="page-title">技術分享文章</h1>
      <p class="page-description">
        這裡收錄我把實作經驗整理成文章的內容，讓作品背後的思考、流程與取捨更完整地被看見。
      </p>
    </section>

    <ArticlesSection :items="articles" />
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
