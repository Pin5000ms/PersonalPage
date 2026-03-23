<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import PortfolioSection from '../components/sections/PortfolioSection.vue'
import { profile, projects } from '../data/siteContent'
</script>

<template>
  <div class="view-shell">
    <HeroSection
      :name="profile.name"
      :title="profile.title"
      :intro="profile.intro"
      :mission="profile.mission"
      :primary-link="profile.primaryLink"
      :secondary-link="profile.secondaryLink"
      :focus-points="profile.focusPoints"
    />

    <PortfolioSection :items="projects" />
  </div>
</template>

<style scoped>
.view-shell {
  display: grid;
  gap: 3.5rem;
}
</style>
