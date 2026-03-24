<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { contactInfo, siteCopy } from '../data/siteContent'

const { locale } = useLanguage()
const contactIcons: Record<string, string> = {
  Email: 'M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Zm2 0v.24l6 4.37 6-4.37v-.24a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75Zm12 2.71-5.41 3.95a1 1 0 0 1-1.18 0L6 9.46v7.79c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75V9.46Z',
  GitHub: 'M12 2.75a9.25 9.25 0 0 0-2.92 18.03c.46.09.63-.2.63-.45 0-.22-.01-.96-.01-1.74-2.31.42-2.91-.57-3.1-1.1-.1-.27-.54-1.1-.92-1.32-.31-.17-.76-.6-.01-.61.7-.01 1.2.64 1.37.91.8 1.35 2.09.97 2.6.74.08-.58.31-.97.56-1.19-2.05-.23-4.18-1.03-4.18-4.56 0-1.01.36-1.84.95-2.49-.09-.23-.41-1.17.09-2.44 0 0 .78-.25 2.56.95a8.86 8.86 0 0 1 4.66 0c1.78-1.21 2.56-.95 2.56-.95.5 1.27.18 2.21.09 2.44.59.65.95 1.47.95 2.49 0 3.54-2.14 4.33-4.19 4.56.32.27.6.79.6 1.6 0 1.16-.01 2.09-.01 2.38 0 .25.17.55.64.45A9.25 9.25 0 0 0 12 2.75Z',
  LinkedIn: 'M6.9 8.25a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM5.7 9.7h2.4V18H5.7V9.7Zm3.9 0h2.3v1.13h.03c.32-.61 1.1-1.26 2.26-1.26 2.42 0 2.87 1.59 2.87 3.66V18h-2.4v-4.23c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.24V18H9.6V9.7Z',
}

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const pageCopy = computed(() => siteCopy.contactPage)

function getContactIcon(label: string) {
  return contactIcons[label] ?? contactIcons.Email
}
</script>

<template>
  <div class="view-shell">
    <section class="page-intro">
      <p class="page-kicker">{{ t(pageCopy.kicker) }}</p>
      <h1 class="page-title">{{ t(pageCopy.title) }}</h1>
      <p class="page-description">{{ t(pageCopy.description) }}</p>
    </section>

    <section class="contact-panel">
      <p class="contact-availability">{{ t(pageCopy.availability) }}</p>
      <div class="contact-grid">
        <a
          v-for="item in contactInfo"
          :key="item.label"
          class="contact-card"
          :href="item.href"
          :target="item.href.startsWith('http') ? '_blank' : undefined"
          :rel="item.href.startsWith('http') ? 'noreferrer' : undefined"
        >
          <div class="contact-card-top">
            <span class="contact-icon" aria-hidden="true">
              <span
                class="contact-icon-mark"
                :class="{
                  'contact-icon-mark-github': item.label === 'GitHub',
                  'contact-icon-mark-linkedin': item.label === 'LinkedIn',
                }"
              >
              <svg viewBox="0 0 24 24" focusable="false">
                <path :d="getContactIcon(item.label)" />
              </svg>
              </span>
            </span>
            <p class="contact-label">{{ item.label }}</p>
          </div>
          <h2 class="contact-value">{{ item.value }}</h2>
        </a>
      </div>
    </section>
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

.contact-panel {
  display: grid;
  gap: 1.35rem;
}

.contact-availability {
  margin: 0;
  padding: 1rem 1.2rem;
  border-radius: 20px;
  border: 1px solid var(--color-line);
  background: rgba(250, 247, 241, 0.9);
  color: var(--color-text);
  box-shadow: var(--shadow-soft);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.contact-card {
  display: grid;
  gap: 0.5rem;
  padding: 1.4rem;
  border: 1px solid var(--color-line);
  border-radius: 24px;
  background: rgba(252, 250, 245, 0.9);
  box-shadow: var(--shadow-soft);
  text-decoration: none;
  transition:
    transform 240ms ease,
    border-color 240ms ease,
    box-shadow 240ms ease,
    background-color 240ms ease;
}

.contact-card:hover {
  transform: translateY(-3px);
  border-color: rgba(95, 125, 118, 0.2);
  background: rgba(255, 253, 248, 0.96);
  box-shadow: 0 24px 40px rgba(88, 104, 97, 0.12);
}

.contact-card-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

.contact-icon-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--color-primary-deep);
}

.contact-icon-mark-github {
  color: #111111;
}

.contact-icon-mark-linkedin {
  border-radius: 0.28rem;
  background: #0a66c2;
  color: #ffffff;
  padding: 0.12rem;
}

.contact-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.contact-label {
  margin: 0;
  color: var(--color-accent);
  font-size: 0.9rem;
}

.contact-value {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.5;
  transition: color 220ms ease;
}

.contact-card:hover .contact-value {
  color: var(--color-primary-deep);
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .view-shell {
    gap: 2.5rem;
  }

  .page-title {
    font-size: clamp(2.1rem, 11vw, 3rem);
  }
}
</style>
