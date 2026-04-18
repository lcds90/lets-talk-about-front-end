<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, tm, rt } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const aboutSectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. SCROLL TRIGGER INDIVIDUAL PARA CADA TEXTO
    const textElements = gsap.utils.toArray('.scroll-reveal') as HTMLElement[]

    textElements.forEach((el) => {
      // Usando fromTo para garantir o "vai e vem" sem bugar no Vue
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 }, // Estado Inicial (Invisível/Em baixo)
        {
          y: 0, // Estado Final (Visível/No lugar original)
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse', // Anima a descer, reverte a subir
          },
        }
      )
    })

    // 2. SCROLL TRIGGER PARA O TÍTULO DE IDIOMAS
    gsap.fromTo(
      '.langs-title',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.langs-title',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      }
    )

    // 3. SCROLL TRIGGER PARA OS CARDS DE IDIOMA
    gsap.fromTo(
      '.lang-card',
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2, // Um card após o outro
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.languages-grid',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      }
    )

    // 4. ANIMAÇÕES PERPÉTUAS (Bandeiras e Notas Musicais)
    gsap.to('.animated-flag', {
      rotation: 12,
      transformOrigin: 'bottom right',
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: 'sine.inOut',
      stagger: 0.3,
    })

    gsap.to('.music-note', {
      y: -8,
      rotation: 10,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: 'sine.inOut',
    })
  }, aboutSectionRef.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="aboutSectionRef" class="about-section py-8 px-4 md:px-8 relative bg-surface-ground">
    <div class="container mx-auto max-w-5xl">
      <div class="section-header mb-6 text-center md:text-left">
        <h2
          class="scroll-reveal text-5xl md:text-7xl font-bold mb-3 flex align-items-center justify-content-center md:justify-content-start gap-4"
        >
          <span class="text-primary">{{ t('about.title') }}</span>
          <span class="music-note inline-block">🎸</span>
        </h2>

        <p class="scroll-reveal text-xl md:text-2xl text-500 font-medium tracking-wide uppercase">
          {{ t('about.subtitle') }}
        </p>
      </div>

      <div
        class="glass-panel p-5 border-round-2xl relative overflow-hidden max-w-4xl mx-auto md:mx-0 mb-8 shadow-4"
      >
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>

        <p class="scroll-reveal text-xl leading-relaxed mb-4 text-600" v-html="t('about.p1')"></p>

        <p
          class="scroll-reveal text-xl leading-relaxed mb-4 text-600"
          v-html="t('about.p2', { company: 'Zenvia' })"
        ></p>

        <p class="scroll-reveal text-xl leading-relaxed text-600">
          {{ t('about.p3') }}
        </p>
      </div>

      <div
        class="scroll-reveal border-top-1 border-white-alpha-20 w-full max-w-30rem mx-auto mb-6"
      ></div>

      <h2 class="langs-title text-4xl font-bold mb-6 text-primary text-center">
        {{ t('languages.title') }} 🌍
      </h2>

      <div class="languages-grid grid justify-content-center gap-4">
        <div v-for="(lang, index) in tm('languages.items')" :key="index" class="col-12 md:col-5">
          <div
            class="lang-card p-4 border-round-xl surface-card shadow-4 flex align-items-center gap-4 border-1 border-white-alpha-10 hover:border-primary transition-colors transition-duration-300 h-full bg-primary-reverse"
          >
            <div class="flag-container text-6xl md:text-7xl">
              <span class="animated-flag inline-block">{{ rt(lang.flag) }}</span>
            </div>

            <div>
              <h3 class="text-2xl font-bold m-0 text-100">{{ rt(lang.name) }}</h3>
              <span
                class="text-primary font-bold text-sm uppercase tracking-wide inline-block mb-2 mt-1"
              >
                {{ rt(lang.level) }}
              </span>
              <p v-if="rt(lang.description)" class="m-0 text-400 line-height-3 text-sm">
                {{ rt(lang.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
}

.glass-panel {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-gradient-primary {
  background: linear-gradient(90deg, #6366f1, #ec4899);
}

.lang-card {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(10px);
}

.flag-container {
  overflow: hidden;
  padding: 10px;
}

.animated-flag {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.5));
  user-select: none;
}
</style>
