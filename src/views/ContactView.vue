<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'
import { contactInfo, siteCopy } from '../data/siteContent'

const { locale } = useLanguage()

function t(text: { zh: string; en: string }) {
  return text[locale.value]
}

const pageCopy = computed(() => siteCopy.contactPage)
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
          <p class="contact-label">{{ item.label }}</p>
          <h2 class="contact-value">{{ item.value }}</h2>
        </a>
      </div>
    </section>
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

.contact-panel {
  display: grid;
  gap: 1rem;
}

.contact-availability {
  margin: 0;
  padding: 1rem 1.2rem;
  border-radius: 20px;
  background: rgba(255, 248, 239, 0.88);
  color: #214340;
  box-shadow: 0 16px 32px rgba(73, 48, 20, 0.08);
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
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 24px;
  background: rgba(255, 251, 246, 0.88);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
  text-decoration: none;
}

.contact-label {
  margin: 0;
  color: #8a4b22;
  font-size: 0.9rem;
}

.contact-value {
  margin: 0;
  font-size: 1.2rem;
  color: #143632;
  line-height: 1.5;
}

@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
