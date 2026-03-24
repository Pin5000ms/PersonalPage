<script setup lang="ts">
import { computed } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import SkillsCardsSection from '../components/sections/SkillsCardsSection.vue'
import { useLanguage } from '../composables/useLanguage'
import { profile, projects, siteCopy, skills } from '../data/siteContent'

const { locale } = useLanguage()

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const pageCopy = computed(() => siteCopy.aboutPage)
const heroCopy = computed(() => siteCopy.hero)
const skillsSectionCopy = computed(() => siteCopy.skillsSection)
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

    <SkillsCardsSection
      :items="skills"
      :kicker="skillsSectionCopy.kicker"
      :title="skillsSectionCopy.title"
      :description="skillsSectionCopy.description"
      :drag-hint="skillsSectionCopy.dragHint"
      :auto-scrolling-label="skillsSectionCopy.autoScrolling"
      :paused-label="skillsSectionCopy.paused"
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

@media (max-width: 720px) {
  .view-shell {
    gap: 2.5rem;
  }
}
</style>
