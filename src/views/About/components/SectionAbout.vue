<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="about-me-section px-4 py-8 md:px-8">
    <div class="container mx-auto max-w-4xl">
      <div class="section-header mb-6 reveal-up">
        <h2 class="text-4xl font-bold text-primary mb-2">
          {{ t('about.title') }} <span class="music-note">🎸</span>
        </h2>
        <p class="text-xl text-600 font-medium">
          {{ t('about.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="about-text reveal-left">
          <p class="text-lg leading-relaxed mb-4" v-html="t('about.p1')"></p>

          <p class="text-lg leading-relaxed mb-4">
            {{ t('about.p2', { company: 'Zenvia' }) }}
          </p>

          <p class="text-lg leading-relaxed">
            {{ t('about.p3') }}
          </p>
        </div>

        <div class="about-stats reveal-right flex flex-column gap-3">
          <div
            class="stat-card p-3 border-round bg-primary-reverse shadow-1 border-left-3 border-primary"
          >
            <span class="block text-sm text-500 uppercase font-bold">
              {{ t('about.stats.stack') }}
            </span>
            <span class="text-xl">{{ t('about.stats.stack_desc') }}</span>
          </div>

          <div
            class="stat-card p-3 border-round bg-primary-reverse shadow-1 border-left-3 border-pink-500"
          >
            <span class="block text-sm text-500 uppercase font-bold">
              {{ t('about.stats.vibe') }}
            </span>
            <span class="text-xl">{{ t('about.stats.vibe_desc') }}</span>
          </div>

          <div
            class="stat-card p-3 border-round bg-primary-reverse shadow-1 border-left-3 border-green-500"
          >
            <span class="block text-sm text-500 uppercase font-bold">
              {{ t('about.stats.focus') }}
            </span>
            <span class="text-xl">{{ t('about.stats.focus_desc') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-me-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  position: relative;
}

.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--surface-card);
}

.stat-card:hover {
  transform: translateX(10px);
  background: var(--surface-hover);
}

/* Hooks para o GSAP ScrollTrigger Futuro */
.reveal-up,
.reveal-left,
.reveal-right {
  visibility: visible;
}
</style>
