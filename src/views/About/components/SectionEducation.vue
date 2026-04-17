<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const certSectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Animação de entrada dos cards Acadêmicos
    gsap.from('.academic-card', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.academic-container',
        start: 'top 85%',
      },
    })

    // 2. Animação de entrada das Certificações (efeito cascata lateral)
    gsap.from('.cert-card', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.certs-container',
        start: 'top 80%',
      },
    })

    // 3. A Jornada do Gato Saltador 🐈 ao longo das certificações
    gsap.to('.jumping-cat', {
      x: '80vw',
      rotation: 360,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.certs-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1.5,
      },
    })
  }, certSectionRef.value ?? undefined)

  return () => ctx.revert()
})
</script>

<template>
  <section
    ref="certSectionRef"
    class="certifications-section py-8 px-4 md:px-8 relative overflow-hidden"
  >
    <div class="container mx-auto max-w-5xl relative z-1">
      <h2 class="text-4xl font-bold mb-8 text-primary text-center">
        {{ t('education.title') }}
      </h2>

      <div class="academic-container mb-8">
        <h3 class="text-2xl font-semibold mb-4 text-600 border-bottom-1 border-300 pb-2">
          {{ t('education.academicTitle') }} 🎓
        </h3>
        <div class="grid">
          <div
            v-for="(course, index) in tm('education.academic')"
            :key="index"
            class="col-12 md:col-6"
          >
            <div
              class="academic-card p-4 h-full border-round bg-primary-reverse shadow-1 border-left-3 border-pink-500 flex flex-column"
            >
              <h4 class="text-xl font-bold m-0 mb-2">{{ rt(course.course) }}</h4>
              <p class="text-700 m-0 font-medium">{{ rt(course.institution) }}</p>

              <div class="mt-2 mb-3">
                <span
                  class="text-sm text-500 inline-block bg-black-alpha-10 px-2 py-1 border-round"
                >
                  {{ rt(course.period) }}
                </span>
              </div>

              <p
                v-if="rt(course.description)"
                class="text-600 line-height-3 m-0 mt-auto pt-3 border-top-1 border-300"
              >
                {{ rt(course.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="certs-container relative pt-4">
        <h3 class="text-2xl font-semibold mb-4 text-600 border-bottom-1 border-300 pb-2">
          {{ t('education.certsTitle') }} 🏆
        </h3>

        <div
          class="jumping-cat absolute text-5xl z-5"
          style="top: -20px; left: -50px; user-select: none"
        >
          🐈
        </div>

        <div class="certs-grid">
          <div
            v-for="(cert, index) in tm('education.certs')"
            :key="index"
            class="cert-card p-3 border-round surface-card shadow-2 flex align-items-center gap-3 border-1 border-200 hover:border-primary transition-colors transition-duration-300"
          >
            <span class="text-3xl">{{ rt(cert.icon) }}</span>
            <div>
              <h4 class="m-0 text-lg font-bold text-800">{{ rt(cert.name) }}</h4>
              <span class="text-sm text-600">{{ rt(cert.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certifications-section {
  background: var(--surface-ground);
}

.jumping-cat {
  pointer-events: none;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

/* Nova classe Grid para alinhar e nivelar o tamanho dos cards */
.certs-grid {
  display: grid;
  /* Cria colunas responsivas que terão no mínimo 280px e crescerão igualmente */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem; /* Equivalente ao gap-4 do PrimeFlex */
}

.cert-card {
  /* Removido o min-width antigo pois o Grid agora controla isso nativamente */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  cursor: default;
  height: 100%; /* Garante que todos estiquem para ter a altura do maior card da linha */
}

.overflow-hidden {
  overflow: hidden;
}
</style>
