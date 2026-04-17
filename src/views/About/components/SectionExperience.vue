<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const { t, tm, rt } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // Animação de entrada dos cards (Staggered)
    gsap.from('.experience-card', {
      opacity: 0,
      x: -50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '.experience-section',
        start: 'top 80%',
      },
    })

    // Parallax para o gato caçador na seção Zenvia
    gsap.to('.cat-hunt', {
      y: -30,
      rotation: 20,
      scrollTrigger: {
        trigger: '.cat-hunt',
        scrub: true,
      },
    })
  }, sectionRef.value ?? undefined)

  return () => ctx.revert() // Performance e limpeza
})
</script>

<template>
  <section ref="sectionRef" class="experience-section py-8 px-4 md:px-8 relative">
    <div class="container mx-auto max-w-5xl">
      <h2 class="text-4xl font-bold mb-8 text-primary reveal-up">
        {{ t('experience.title') }}
      </h2>

      <div class="flex flex-column gap-6">
        <div
          v-for="(job, index) in tm('experience.jobs')"
          :key="index"
          class="experience-card p-4 md:p-6 border-round bg-primary-reverse shadow-2 border-left-3 border-primary relative"
        >
          <span
            v-if="job.hasCat"
            class="cat-hunt absolute text-4xl"
            style="top: -20px; right: 20px"
          >
            🐈‍⬛
          </span>

          <div
            class="flex flex-column md:flex-row justify-content-between align-items-start mb-4 gap-3"
          >
            <div>
              <h3 class="text-3xl font-bold m-0">{{ rt(job.company) }}</h3>
              <span class="text-primary font-medium text-lg">{{ rt(job.role) }}</span>
            </div>
            <div class="text-left md:text-right text-500 text-sm">
              <div class="font-bold border-round bg-primary-reverse p-1 px-2 inline-block mb-1">
                {{ rt(job.period) }}
              </div>
              <div>{{ rt(job.location) }}</div>
            </div>
          </div>

          <p v-if="rt(job.description)" class="text-700 line-height-3 mb-4">
            {{ rt(job.description) }}
          </p>

          <ul class="list-none p-0 m-0 flex flex-column gap-3">
            <li
              v-for="(achievement, aIndex) in job.achievements"
              :key="aIndex"
              class="flex align-items-start gap-3 text-700 line-height-3"
            >
              <span class="text-primary mt-1">⚡</span>
              <span v-html="achievement"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-card {
  transition:
    transform 0.3s ease,
    background 0.3s ease;
  z-index: 2;
}

.experience-card:hover {
  transform: scale(1.02);
  background: var(--surface-hover);
}

.cat-hunt {
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
}
</style>
