<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import type { LocalizedText, SkillItem } from '../../data/siteContent'

interface Props {
  items: SkillItem[]
  kicker: LocalizedText
  title: LocalizedText
  description: LocalizedText
  dragHint: LocalizedText
  autoScrollingLabel: LocalizedText
  pausedLabel: LocalizedText
}

const props = defineProps<Props>()
const { locale } = useLanguage()

function t(text: LocalizedText) {
  return text[locale.value]
}

const skillCards = computed(() => props.items)
const totalTags = computed(() =>
  props.items.reduce((count, item) => count + item.tags.length, 0),
)
</script>

<template>
  <section class="skills" id="skills">
    <div class="skills-intro">
      <p class="section-kicker">{{ t(kicker) }}</p>
      <h2 class="section-title">{{ t(title) }}</h2>
      <p class="section-description">{{ t(description) }}</p>

      <div class="skills-overview" aria-label="skills overview">
        <article class="overview-card">
          <span class="overview-value">{{ skillCards.length }}</span>
          <span class="overview-label">{{ locale === 'zh' ? '技能分類' : 'Categories' }}</span>
        </article>
        <article class="overview-card">
          <span class="overview-value">{{ totalTags }}</span>
          <span class="overview-label">{{ locale === 'zh' ? '核心技能' : 'Core skills' }}</span>
        </article>
      </div>
    </div>

    <div class="skills-grid">
      <article
        v-for="(skill, index) in skillCards"
        :key="t(skill.title)"
        class="skill-card"
        :style="{ '--card-accent-delay': `${index * 80}ms` }"
      >
        <div class="skill-card-header">
          <span class="skill-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="skill-title">{{ t(skill.title) }}</h3>
        </div>
        <p class="skill-summary">{{ t(skill.summary) }}</p>
        <ul class="skill-tags">
          <li v-for="tag in skill.tags" :key="tag" class="skill-tag">{{ tag }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.skills {
  --skills-border: var(--color-line);
  --skills-shadow: var(--shadow-card);
  --skills-panel: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(247, 243, 235, 0.82));
  --skills-accent: linear-gradient(90deg, #c0d0c8, #b78d64);
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.35fr);
  gap: 1.5rem;
  align-items: start;
}

.skills-intro {
  position: sticky;
  top: 1.5rem;
  display: grid;
  gap: 1.2rem;
  padding: 1.6rem;
  border: 1px solid var(--skills-border);
  border-radius: 32px;
  background:
    radial-gradient(circle at top right, rgba(211, 225, 218, 0.44), transparent 34%),
    linear-gradient(180deg, rgba(252, 250, 245, 0.92), rgba(244, 240, 232, 0.82));
  box-shadow: var(--skills-shadow);
  overflow: hidden;
}

.skills-intro::after {
  content: "";
  position: absolute;
  inset: auto -10% -18% auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(183, 141, 100, 0.22), transparent 70%);
  pointer-events: none;
}

.section-kicker {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.08;
}

.section-description {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.85;
}

.skills-overview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.overview-card {
  display: grid;
  gap: 0.15rem;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(183, 141, 100, 0.18);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.56);
}

.overview-value {
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
}

.overview-label {
  color: var(--color-accent);
  font-size: 0.92rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skill-card {
  position: relative;
  display: grid;
  gap: 1rem;
  min-height: 100%;
  padding: 1.4rem;
  border: 1px solid var(--skills-border);
  border-radius: 28px;
  background: var(--skills-panel);
  box-shadow: var(--skills-shadow);
  overflow: hidden;
  transition:
    transform 260ms ease,
    border-color 260ms ease,
    box-shadow 260ms ease,
    background-color 260ms ease;
}

.skill-card::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 4px;
  background: var(--skills-accent);
  opacity: 0.95;
  animation: skillAccentIn 0.7s ease-out both;
  animation-delay: var(--card-accent-delay);
}

.skill-card:hover {
  transform: translateY(-3px);
  border-color: rgba(95, 125, 118, 0.2);
  box-shadow: 0 30px 52px rgba(88, 104, 97, 0.12);
}

.skill-card-header {
  display: grid;
  gap: 0.7rem;
}

.skill-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  background: rgba(95, 125, 118, 0.1);
  color: var(--color-primary-deep);
  font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  font-variant-numeric: lining-nums tabular-nums;
  font-feature-settings: "lnum" 1, "tnum" 1;
}

.skill-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.28rem;
  line-height: 1.2;
  transition: color 220ms ease;
}

.skill-card:hover .skill-title {
  color: var(--color-primary-deep);
}

.skill-summary {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.75;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-tag {
  --pill-border-color: rgba(183, 141, 100, 0.22);
  --pill-background: rgba(250, 246, 239, 0.92);
  --pill-background-hover: rgba(245, 240, 231, 0.98);
  --pill-text: #876648;
}

@keyframes skillAccentIn {
  from {
    transform: scaleX(0.2);
    transform-origin: left;
    opacity: 0;
  }

  to {
    transform: scaleX(1);
    transform-origin: left;
    opacity: 0.95;
  }
}

@media (max-width: 980px) {
  .skills {
    grid-template-columns: 1fr;
  }

  .skills-intro {
    position: static;
  }
}

@media (max-width: 700px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skills-overview {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .skills-intro {
    padding: 1.25rem;
    border-radius: 26px;
  }

  .skill-card {
    padding: 1.2rem;
    border-radius: 24px;
  }

  .skills-overview {
    grid-template-columns: 1fr;
  }
}
</style>
