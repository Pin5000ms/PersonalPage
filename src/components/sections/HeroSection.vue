<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
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
const typedText = shallowRef('')
const showCaret = shallowRef(true)
let typingInterval: number | null = null
let caretInterval: number | null = null

function t(text: LocalizedText) {
  return text[locale.value]
}

const localizedFocusPoints = computed(() => props.focusPoints.map((point) => t(point)))
const typewriterText = computed(() => `${t(props.name)} 👨‍💻`)

function clearTimers() {
  if (typingInterval !== null) {
    window.clearInterval(typingInterval)
    typingInterval = null
  }

  if (caretInterval !== null) {
    window.clearInterval(caretInterval)
    caretInterval = null
  }
}

function splitGraphemes(value: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(value), (segment) => segment.segment)
  }

  return Array.from(value)
}

function startTypewriter() {
  clearTimers()
  typedText.value = ''
  showCaret.value = true

  const characters = splitGraphemes(typewriterText.value)
  let index = 0

  typingInterval = window.setInterval(() => {
    typedText.value += characters[index] ?? ''
    index += 1

    if (index >= characters.length && typingInterval !== null) {
      window.clearInterval(typingInterval)
      typingInterval = null
    }
  }, 95)

  caretInterval = window.setInterval(() => {
    showCaret.value = !showCaret.value
  }, 650)
}

watch(typewriterText, () => {
  startTypewriter()
})

onMounted(() => {
  startTypewriter()
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <p class="hero-kicker">{{ t(kicker) }}</p>
      <div class="hero-title-wrap">
        <h1 class="hero-title">
          <span>{{ typedText }}</span>
          <span class="hero-caret" :class="{ 'hero-caret-hidden': !showCaret }">|</span>
        </h1>
      </div>
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

.hero-title-wrap {
  position: relative;
  margin: 0 0 0.3rem;
  padding: 1.35rem 1.35rem 1.65rem;
  border: 1px solid rgba(12, 30, 27, 0.18);
  border-radius: 22px;
  background: linear-gradient(180deg, #1d2222 0%, #0f1111 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 18px 30px rgba(16, 24, 24, 0.18);
}

.hero-title {
  display: inline-block;
  margin: 0;
  padding-bottom: 0.08em;
  color: #f7f9f8;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  white-space: nowrap;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.12);
}

.hero-caret {
  display: inline-block;
  margin-left: 0.06em;
  color: #f7f9f8;
  transition: opacity 140ms ease;
}

.hero-caret-hidden {
  opacity: 0;
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

  .hero-title {
    white-space: normal;
  }
}
</style>
