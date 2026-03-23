<script setup lang="ts">
import { computed } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { profile, projects, siteCopy } from '../data/siteContent'

const { locale } = useLanguage()

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const pageCopy = computed(() => siteCopy.aboutPage)
const heroCopy = computed(() => siteCopy.hero)
const projectSectionCopy = computed(() => siteCopy.projectsSection)
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">{{ t(pageCopy.kicker) }}</p>
      <h1 class="page-title">{{ t(pageCopy.title) }}</h1>
      <p class="page-description">{{ t(pageCopy.description) }}</p>
    </section>

    <HeroSection
      :name="profile.name"
      :avatar-src="profile.avatarSrc"
      :avatar-alt="profile.avatarAlt"
      :title="profile.title"
      :intro="profile.intro"
      :mission="profile.mission"
      :primary-link="profile.primaryLink"
      :secondary-link="profile.secondaryLink"
      :focus-points="profile.focusPoints"
      :kicker="heroCopy.kicker"
      :panel-label="heroCopy.panelLabel"
    />

    <PortfolioSection
      :items="projects"
      :kicker="projectSectionCopy.kicker"
      :title="projectSectionCopy.title"
      :description="projectSectionCopy.description"
      :ai-title="projectSectionCopy.aiTitle"
      :other-title="projectSectionCopy.otherTitle"
      :detail-label="projectSectionCopy.detailLabel"
      :drag-hint="projectSectionCopy.dragHint"
      :auto-scrolling-label="projectSectionCopy.autoScrolling"
      :paused-label="projectSectionCopy.paused"
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
