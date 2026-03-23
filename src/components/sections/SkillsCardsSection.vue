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
          <span class="overview-label">{{ locale === 'zh' ? '核心技術' : 'Core tools' }}</span>
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
  --skills-border: rgba(20, 54, 50, 0.12);
  --skills-shadow: 0 24px 48px rgba(91, 57, 24, 0.08);
  --skills-panel: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 247, 237, 0.72));
  --skills-accent: linear-gradient(135deg, #c97d36, #0f5c53);
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
  background: linear-gradient(180deg, rgba(255, 251, 245, 0.9), rgba(244, 236, 225, 0.72));
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
  background: radial-gradient(circle, rgba(15, 92, 83, 0.18), transparent 70%);
  pointer-events: none;
}

.section-kicker {
  margin: 0;
  color: #8a4b22;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.08;
}

.section-description {
  margin: 0;
  color: #31534f;
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
  border: 1px solid rgba(143, 88, 40, 0.14);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.56);
}

.overview-value {
  font-size: clamp(1.8rem, 5vw, 2.4rem);
  font-weight: 700;
  line-height: 1;
  color: #143632;
}

.overview-label {
  color: #6b441f;
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

.skill-card-header {
  display: grid;
  gap: 0.7rem;
}

.skill-index {
  display: inline-flex;
  width: fit-content;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(20, 54, 50, 0.08);
  color: #0f5c53;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.skill-title {
  margin: 0;
  font-size: 1.28rem;
  line-height: 1.2;
}

.skill-summary {
  margin: 0;
  color: #31534f;
  line-height: 1.75;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-tag {
  padding: 0.5rem 0.82rem;
  border: 1px solid rgba(201, 125, 54, 0.18);
  border-radius: 999px;
  background: rgba(255, 248, 238, 0.88);
  color: #6b441f;
  font-size: 0.9rem;
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
