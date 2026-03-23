<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useAutoScrollTrack } from '../../composables/useAutoScrollTrack'
import type { SkillItem } from '../../data/siteContent'

interface Props {
  items: SkillItem[]
}

const props = defineProps<Props>()

const skillCards = computed(() => props.items)
const skillTrack = useTemplateRef<HTMLElement>('skillTrack')
const {
  canScroll: canScrollSkills,
  isAutoScrolling: isAutoScrollingSkills,
  pauseWithResume: pauseSkillsTrack,
} = useAutoScrollTrack(skillTrack, computed(() => props.items.length), {
  threshold: 3,
})
</script>

<template>
  <section class="skills" id="skills">
    <div class="section-heading">
      <p class="section-kicker">What I can help with</p>
      <h2 class="section-title">技能不只是列清單，也要能支撐作品與內容輸出</h2>
      <p class="section-description">
        這一區聚焦的是你真正想被記住的能力，而不是把所有用過的工具一次堆上來。
      </p>
    </div>

    <div
      ref="skillTrack"
      class="skill-track"
      :class="{ 'skill-track-active': canScrollSkills }"
      @mouseenter="pauseSkillsTrack"
      @mouseleave="pauseSkillsTrack"
      @touchstart.passive="pauseSkillsTrack"
      @wheel.passive="pauseSkillsTrack"
      @pointerdown="pauseSkillsTrack"
      @focusin="pauseSkillsTrack"
    >
      <article
        v-for="skill in skillCards"
        :key="skill.title"
        class="skill-card"
      >
        <h3 class="skill-title">{{ skill.title }}</h3>
        <p class="skill-summary">{{ skill.summary }}</p>
        <ul class="skill-tags">
          <li v-for="tag in skill.tags" :key="tag" class="skill-tag">
            {{ tag }}
          </li>
        </ul>
      </article>
    </div>

    <p v-if="canScrollSkills" class="track-hint">
      向右滑動查看更多技能
      <span class="track-status">
        {{ isAutoScrollingSkills ? 'Auto scrolling' : 'Paused for browsing' }}
      </span>
    </p>
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  gap: 1.5rem;
}

.section-heading {
  max-width: 60ch;
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

.skill-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 360px);
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;
}

.skill-track::-webkit-scrollbar {
  height: 10px;
}

.skill-track::-webkit-scrollbar-thumb {
  background: rgba(15, 92, 83, 0.22);
  border-radius: 999px;
}

.skill-track-active {
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    rgba(0, 0, 0, 1) 3%,
    rgba(0, 0, 0, 1) 97%,
    transparent 100%
  );
}

.skill-card {
  padding: 1.4rem;
  border: 1px solid rgba(8, 42, 38, 0.12);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.62);
  box-shadow: 0 18px 38px rgba(91, 57, 24, 0.06);
}

.skill-title {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.skill-summary {
  margin: 0;
  color: #31534f;
  line-height: 1.7;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.skill-tag {
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #f2e0c7;
  color: #6b441f;
  font-size: 0.9rem;
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

@media (max-width: 860px) {
  .skill-track {
    grid-auto-columns: minmax(260px, 88vw);
  }

  .track-hint {
    flex-direction: column;
  }
}
</style>
