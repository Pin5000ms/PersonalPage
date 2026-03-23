<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useAutoScrollTrack } from '../../composables/useAutoScrollTrack'
import type { ProjectItem } from '../../data/siteContent'

interface Props {
  items: ProjectItem[]
}

const props = defineProps<Props>()

const projectCards = computed(() => props.items)
const projectTrack = useTemplateRef<HTMLElement>('projectTrack')
const {
  canScroll: canScrollProjects,
  isAutoScrolling: isAutoScrollingProjects,
  pauseWithResume: pauseProjectsTrack,
} = useAutoScrollTrack(projectTrack, computed(() => props.items.length), {
  threshold: 2,
  speed: 0.4,
})
</script>

<template>
  <section class="portfolio" id="portfolio">
    <div class="section-heading">
      <p class="section-kicker">Selected work</p>
      <h2 class="section-title">把做過的事說清楚，比只列技術名詞更有說服力</h2>
      <p class="section-description">
        每個專案都用「做了什麼、為什麼這樣做、最後帶來什麼結果」來呈現，讓讀者能快速理解你的價值。
      </p>
    </div>

    <div
      ref="projectTrack"
      class="project-track"
      :class="{ 'project-track-active': canScrollProjects }"
      @mouseenter="pauseProjectsTrack"
      @mouseleave="pauseProjectsTrack"
      @touchstart.passive="pauseProjectsTrack"
      @wheel.passive="pauseProjectsTrack"
      @pointerdown="pauseProjectsTrack"
      @focusin="pauseProjectsTrack"
    >
      <article
        v-for="project in projectCards"
        :key="project.title"
        class="project-card"
      >
        <div class="project-head">
          <p class="project-category">{{ project.category }}</p>
          <h3 class="project-title">{{ project.title }}</h3>
        </div>

        <p class="project-summary">{{ project.summary }}</p>
        <p class="project-outcome">{{ project.outcome }}</p>

        <dl class="project-metrics">
          <div
            v-for="metric in project.metrics"
            :key="metric.label"
            class="project-metric"
          >
            <dt class="project-metric-label">{{ metric.label }}</dt>
            <dd class="project-metric-value">{{ metric.value }}</dd>
          </div>
        </dl>

        <ul class="project-stack">
          <li v-for="item in project.stack" :key="item" class="project-stack-item">
            {{ item }}
          </li>
        </ul>

        <div class="project-links">
          <a
            v-for="link in project.links"
            :key="link.label"
            class="project-link"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </div>
      </article>
    </div>

    <p v-if="canScrollProjects" class="track-hint">
      向右滑動查看更多作品
      <span class="track-status">
        {{ isAutoScrollingProjects ? 'Auto scrolling' : 'Paused for browsing' }}
      </span>
    </p>
  </section>
</template>

<style scoped>
.portfolio {
  display: grid;
  gap: 1.5rem;
}

.section-heading {
  max-width: 65ch;
}

.section-kicker {
  margin: 0 0 0.75rem;
  color: #8a4b22;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-description {
  margin: 1rem 0 0;
  color: #31534f;
  line-height: 1.8;
}

.project-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(360px, 520px);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.project-track::-webkit-scrollbar {
  height: 10px;
}

.project-track::-webkit-scrollbar-thumb {
  background: rgba(15, 92, 83, 0.22);
  border-radius: 999px;
}

.project-track-active {
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    rgba(0, 0, 0, 1) 3%,
    rgba(0, 0, 0, 1) 97%,
    transparent 100%
  );
}

.project-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255, 248, 239, 0.96), rgba(255, 255, 255, 0.82));
  box-shadow: 0 18px 42px rgba(91, 57, 24, 0.08);
}

.project-category {
  margin: 0 0 0.6rem;
  color: #8a4b22;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.project-title {
  margin: 0;
  font-size: 1.45rem;
}

.project-summary,
.project-outcome {
  margin: 0;
  color: #31534f;
  line-height: 1.75;
}

.project-outcome {
  padding-left: 1rem;
  border-left: 3px solid rgba(15, 92, 83, 0.22);
}

.project-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin: 0;
}

.project-metric {
  padding: 0.85rem;
  border-radius: 18px;
  background: rgba(242, 224, 199, 0.4);
}

.project-metric-label {
  margin: 0;
  color: #8a4b22;
  font-size: 0.82rem;
}

.project-metric-value {
  margin: 0.35rem 0 0;
  color: #143632;
  font-weight: 600;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-stack-item {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #e4f0ea;
  color: #0f5c53;
  font-size: 0.9rem;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 92, 83, 0.18);
  color: #0f5c53;
  text-decoration: none;
}

.track-hint {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  color: #6b441f;
  font-size: 0.92rem;
}

.track-status {
  color: #0f5c53;
}

@media (max-width: 920px) {
  .project-track {
    grid-auto-columns: minmax(300px, 88vw);
  }
}

@media (max-width: 640px) {
  .project-metrics {
    grid-template-columns: 1fr;
  }

  .track-hint {
    flex-direction: column;
  }
}
</style>
