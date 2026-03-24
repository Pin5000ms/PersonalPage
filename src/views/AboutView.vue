<script setup lang="ts">
import { computed } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import SkillsCardsSection from '../components/sections/SkillsCardsSection.vue'
import aboutBanner from '../assets/about_banner.jpg'
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
      <div class="page-banner" aria-label="About banner">
        <div class="page-banner-frame">
          <img class="page-banner-image" :src="aboutBanner" alt="About page banner" />
          <div class="page-banner-overlay">
            <p class="page-kicker">{{ t(pageCopy.kicker) }}</p>
            <h1 class="page-title">{{ t(pageCopy.title) }}</h1>
            <p class="page-description">{{ t(pageCopy.description) }}</p>
          </div>
        </div>
      </div>
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
  display: grid;
  gap: 1.25rem;
}

.page-kicker {
  margin: 0;
  color: rgba(255, 250, 241, 0.88);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
}

.page-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 1.05;
  color: #fffaf1;
  text-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.page-description {
  max-width: 26rem;
  margin: 0;
  color: rgba(255, 250, 241, 0.9);
  line-height: 1.8;
  text-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
}

.page-banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 11.5rem;
  padding: 0.65rem;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 2rem;
  background:
    linear-gradient(180deg, rgba(252, 250, 245, 0.22), rgba(246, 242, 234, 0.14));
  box-shadow: var(--shadow-card);
}

.page-banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), transparent 22%),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.16), transparent 24%);
  pointer-events: none;
}

.page-banner-frame {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: 10.2rem;
  border: 1px solid rgba(255, 255, 255, 0.46);
  border-radius: 1.45rem;
  background: rgba(255, 252, 247, 0.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.42),
    0 14px 24px rgba(88, 104, 97, 0.08);
}

.page-banner-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(16, 23, 22, 0.18), rgba(16, 23, 22, 0.28)),
    radial-gradient(circle at center, rgba(255, 255, 255, 0.08), transparent 38%);
  pointer-events: none;
}

.page-banner-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 10.2rem;
  object-fit: cover;
}

.page-banner-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: grid;
  align-content: center;
  justify-items: start;
  gap: 0.6rem;
  padding: 1.4rem 1.8rem;
  text-align: left;
}

@media (max-width: 720px) {
  .view-shell {
    gap: 2.5rem;
  }

  .page-title {
    font-size: clamp(2.1rem, 11vw, 3rem);
  }

  .page-banner {
    min-height: 9rem;
    padding: 0.55rem;
    border-radius: 1.5rem;
  }

  .page-banner-frame,
  .page-banner-image {
    min-height: 7.9rem;
    border-radius: 1.1rem;
  }

  .page-banner-overlay {
    padding: 1rem 1.1rem;
  }
}
</style>
