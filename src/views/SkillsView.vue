<script setup lang="ts">
import SkillsSection from '../components/sections/SkillsSection.vue'
import { skills } from '../data/siteContent'
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Skills overview</p>
      <h1 class="page-title">我的技能</h1>
      <p class="page-description">
        這一頁整理我想被記住的前端能力，包含 Vue 開發、介面體驗與技術內容創作。
      </p>
    </section>

    <SkillsSection :items="skills" />
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
