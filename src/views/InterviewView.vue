<script setup lang="ts">
import { interviews } from '../data/siteContent'
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Interview notes</p>
      <h1 class="page-title">面試經驗</h1>
      <p class="page-description">
        我把面試練習與回顧整理在這裡，方便之後持續累積自己的回答框架與經驗總結。
      </p>
    </section>

    <section class="interview-list">
      <article
        v-for="item in interviews"
        :key="`${item.company}-${item.year}`"
        class="interview-card"
      >
        <p class="interview-meta">{{ item.year }} · {{ item.role }}</p>
        <h2 class="interview-company">{{ item.company }}</h2>
        <p class="interview-summary">{{ item.summary }}</p>
        <ul class="interview-takeaways">
          <li
            v-for="takeaway in item.takeaways"
            :key="takeaway"
            class="interview-takeaway"
          >
            {{ takeaway }}
          </li>
        </ul>
      </article>
    </section>
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

.interview-list {
  display: grid;
  gap: 1rem;
}

.interview-card {
  padding: 1.5rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background: rgba(255, 251, 246, 0.88);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
}

.interview-meta {
  margin: 0 0 0.5rem;
  color: #8a4b22;
  font-size: 0.9rem;
}

.interview-company {
  margin: 0;
  font-size: 1.45rem;
}

.interview-summary {
  margin: 0.9rem 0 1rem;
  color: #31534f;
  line-height: 1.8;
}

.interview-takeaways {
  margin: 0;
  padding-left: 1.25rem;
  color: #214340;
}

.interview-takeaway + .interview-takeaway {
  margin-top: 0.55rem;
}
</style>
