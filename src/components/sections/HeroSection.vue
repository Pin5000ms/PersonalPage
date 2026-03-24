<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { useLanguage } from '../../composables/useLanguage'
import type { LinkItem, LocalizedText } from '../../data/siteContent'

interface Props {
  name: LocalizedText
  avatarSrc: string
  avatarAlt: LocalizedText
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
      <div class="hero-heading">
        <div class="hero-avatar-wrap">
          <img class="hero-avatar" :src="avatarSrc" :alt="t(avatarAlt)" />
        </div>
        <div class="hero-title-wrap">
          <div class="hero-title-copy">
            <h1 class="hero-title">
              <span>{{ typedText }}</span>
              <span class="hero-caret" :class="{ 'hero-caret-hidden': !showCaret }">|</span>
            </h1>
          </div>
        </div>
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
  gap: 2.35rem;
  align-items: stretch;
}

.hero-copy,
.hero-panel {
  border: 1px solid var(--color-line);
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(252, 250, 245, 0.92), rgba(247, 243, 235, 0.86));
  box-shadow: var(--shadow-card);
}

.hero-copy {
  padding: 2.3rem;
  animation: heroFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-panel {
  padding: 1.7rem;
  align-self: end;
  animation: heroFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 140ms;
}

.hero-kicker,
.hero-panel-label {
  margin: 0 0 0.75rem;
  color: var(--color-accent);
  font-size: 0.82rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-heading {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.3rem;
}

.hero-avatar-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  border: 1px solid rgba(95, 125, 118, 0.14);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(241, 236, 227, 0.92) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
  animation: heroSoftFloat 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 120ms;
}

.hero-title-wrap {
  position: relative;
  padding: 1.35rem 1.55rem 1.65rem 1.35rem;
  border: 1px solid rgba(95, 125, 118, 0.18);
  border-radius: 22px;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.16), transparent 32%),
    linear-gradient(180deg, #6f8982 0%, #566f69 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 18px 30px rgba(95, 125, 118, 0.18);
  animation: heroSoftFloat 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-title-copy {
  min-width: 0;
}

.hero-avatar {
  width: clamp(88px, 12vw, 122px);
  aspect-ratio: 1;
  border-radius: 999px;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 26px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.06);
  background: #708982;
}

.hero-title {
  display: inline-block;
  margin: 0;
  padding-right: 0.18em;
  padding-bottom: 0.08em;
  color: #fbfaf7;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4.6vw, 3.45rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.035em;
  white-space: nowrap;
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.08);
}

.hero-caret {
  display: inline-block;
  margin-left: 0.06em;
  color: #fbfaf7;
  transition: opacity 140ms ease;
}

.hero-caret-hidden {
  opacity: 0;
}

.hero-role,
.hero-intro,
.hero-mission,
.hero-point {
  color: var(--color-text);
}

.hero-role {
  margin: 0.65rem 0 1rem;
  color: var(--color-primary-deep);
  font-size: 1.08rem;
}

.hero-role,
.hero-intro,
.hero-mission {
  animation: heroFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-role {
  animation-delay: 180ms;
}

.hero-intro {
  animation-delay: 240ms;
}

.hero-mission {
  animation-delay: 300ms;
}

.hero-intro,
.hero-mission {
  max-width: 56ch;
  font-size: 1rem;
  line-height: 1.95;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.8rem;
  animation: heroFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 340ms;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.75rem 1.2rem;
  border-radius: 999px;
  text-decoration: none;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background-color 220ms ease,
    border-color 220ms ease;
}

.hero-link:hover {
  transform: translateY(-2px) scale(1.01);
}

.hero-link-primary {
  background: linear-gradient(135deg, #718c85, #5a736d);
  color: #faf7f1;
  box-shadow: 0 12px 24px rgba(95, 125, 118, 0.18);
}

.hero-link-secondary {
  border: 1px solid var(--color-line-strong);
  background: rgba(255, 255, 255, 0.48);
  color: var(--color-primary-deep);
}

.hero-points {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.9;
}

.hero-point {
  animation: heroFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-point:nth-child(1) {
  animation-delay: 220ms;
}

.hero-point:nth-child(2) {
  animation-delay: 300ms;
}

.hero-point:nth-child(3) {
  animation-delay: 380ms;
}

.hero-point:nth-child(4) {
  animation-delay: 460ms;
}

.hero-point + .hero-point {
  margin-top: 0.75rem;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroSoftFloat {
  from {
    opacity: 0;
    transform: translateY(22px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .hero-heading {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .hero-avatar-wrap {
    width: fit-content;
  }

  .hero-title {
    white-space: normal;
  }

  .hero-copy,
  .hero-panel {
    padding: 1.6rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy,
  .hero-panel,
  .hero-avatar-wrap,
  .hero-title-wrap,
  .hero-role,
  .hero-intro,
  .hero-mission,
  .hero-actions,
  .hero-point {
    animation: none !important;
  }
}
</style>
