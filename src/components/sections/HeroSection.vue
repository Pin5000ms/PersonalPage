<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import type { LinkItem, LocalizedText } from '../../data/siteContent'

interface Props {
  name: LocalizedText
  title: LocalizedText
  intro: LocalizedText
  mission: LocalizedText
  primaryLink: LinkItem
  secondaryLink: LinkItem
  focusPoints: LocalizedText[]
  kicker: LocalizedText
  panelLabel: LocalizedText
}

const props = defineProps<Props>()
const { locale } = useLanguage()

function t(text: LocalizedText) {
  return text[locale.value]
}

const localizedFocusPoints = computed(() => props.focusPoints.map((point) => t(point)))
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="hero-kicker">{{ t(kicker) }}</p>
      <h1 class="hero-title">{{ t(name) }}</h1>
      <p class="hero-role">{{ t(title) }}</p>
      <p class="hero-intro">{{ t(intro) }}</p>
      <p class="hero-mission">{{ t(mission) }}</p>
      <div class="hero-actions">
        <a class="hero-link hero-link-primary" :href="primaryLink.href">
          {{ t(primaryLink.label) }}
        </a>
        <a class="hero-link hero-link-secondary" :href="secondaryLink.href">
          {{ t(secondaryLink.label) }}
        </a>
      </div>
    </div>
    <div class="hero-panel">
      <p class="hero-panel-label">{{ t(panelLabel) }}</p>
      <ul class="hero-points">
        <li
          v-for="point in localizedFocusPoints"
          :key="point"
          class="hero-point"
        >
          {{ point }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(280px, 1fr);
  gap: 2rem;
  align-items: stretch;
}

.hero-copy,
.hero-panel {
  border: 1px solid rgba(8, 42, 38, 0.15);
  border-radius: 28px;
  background: rgba(255, 248, 239, 0.8);
  box-shadow: 0 18px 45px rgba(73, 48, 20, 0.08);
  backdrop-filter: blur(12px);
}

.hero-copy {
  padding: 2rem;
}

.hero-panel {
  padding: 1.5rem;
  align-self: end;
}

.hero-kicker,
.hero-panel-label {
  margin: 0 0 0.75rem;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-title {
  margin: 0;
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: 0.95;
}

.hero-role,
.hero-intro,
.hero-mission,
.hero-point {
  color: #20423e;
}

.hero-role {
  margin: 0.65rem 0 1rem;
  font-size: 1.1rem;
}

.hero-intro,
.hero-mission {
  max-width: 56ch;
  font-size: 1rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.5rem;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.hero-link:hover {
  transform: translateY(-2px);
}

.hero-link-primary {
  background: #0f5c53;
  color: #fff6eb;
  box-shadow: 0 12px 24px rgba(15, 92, 83, 0.18);
}

.hero-link-secondary {
  border: 1px solid rgba(15, 92, 83, 0.18);
  color: #0f5c53;
}

.hero-points {
  margin: 0;
  padding-left: 1.25rem;
}

.hero-point + .hero-point {
  margin-top: 0.75rem;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
