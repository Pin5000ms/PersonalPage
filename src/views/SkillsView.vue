<script setup lang="ts">
import SkillsCardsSection from '../components/sections/SkillsCardsSection.vue'
import { computed } from 'vue'
import { siteCopy, skills } from '../data/siteContent'

const sectionCopy = computed(() => siteCopy.skillsSection)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">Skills overview</p>
      <h1 class="page-title">我的技能</h1>
      <p class="page-description">這一頁整理我目前的軟體工程、AI、電腦視覺與 Web 開發能力。</p>
    </section>

    <SkillsCardsSection
      :items="skills"
      :kicker="sectionCopy.kicker"
      :title="sectionCopy.title"
      :description="sectionCopy.description"
      :drag-hint="sectionCopy.dragHint"
      :auto-scrolling-label="sectionCopy.autoScrolling"
      :paused-label="sectionCopy.paused"
    />
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
