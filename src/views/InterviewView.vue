<script setup lang="ts">
import { computed } from 'vue'
import ContentFeed from '../components/content/ContentFeed.vue'
import { interviews } from '../data/siteContent'

const contentItems = computed(() =>
  interviews.map((item) => ({
    title: { zh: `${item.company}`, en: item.company },
    summary: item.summary,
    meta: `${item.year} · ${item.role.zh}`,
    href: '#',
    imageLabel: item.imageLabel,
    imageTone: item.imageTone,
    bulletPoints: item.takeaways,
    ctaLabel: '查看重點',
  })),
)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Interview notes</p>
      <h1 class="page-title">面試經驗</h1>
      <p class="page-description">
        我把曾面試過的公司和過程整理在這邊，希望能幫到有需要的人。
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
