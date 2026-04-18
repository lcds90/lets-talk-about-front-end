<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const academicRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Títulos (Fade Up)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap.utils.toArray('.section-title').forEach((title: any) => {
      gsap.from(title, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
      })
    })

    // 2. Clusters Académicos
    const clusters = gsap.utils.toArray('.cluster-section') as HTMLElement[]

    clusters.forEach((cluster, i) => {
      const shapeBg = cluster.querySelector('.shape-bg')
      const dotsFg = cluster.querySelector('.dots-fg')
      const mainCard = cluster.querySelector('.main-card')
      const caption = cluster.querySelector('.caption')

      const isEven = i % 2 === 0

      // --- A MÁGICA DO TRIÂNGULO/CÍRCULO (AMARRADO AO SCROLL) ---
      if (shapeBg) {
        // Criamos uma timeline com scrub para controlar Entrada -> Pausa -> Saída
        const tlShape = gsap.timeline({
          scrollTrigger: {
            trigger: cluster,
            start: 'top bottom', // Inicia quando o topo da secção toca no fundo da tela
            end: 'bottom top', // Termina quando a secção sai pelo topo da tela
            scrub: 1, // 100% amarrado à rodinha do rato
          },
        })

        // ETAPA 1: Entra na tela vindo de fora (x: -400 ou 400) até à sua posição original (x: 0 - as extremas horizontais no CSS)
        tlShape
          .fromTo(
            shapeBg,
            { x: isEven ? -400 : 400, opacity: 0, rotation: isEven ? -45 : 90 },
            {
              x: 0,
              opacity: isEven ? 0.4 : 0.6,
              rotation: isEven ? 0 : 40,
              duration: 1,
              ease: 'power1.out',
            }
          )
          // ETAPA 2: Fica "estacionado" na extrema horizontal enquanto o utilizador lê o card no centro
          .to(shapeBg, { x: 0, duration: 1.5 })
          // ETAPA 3: Sai da tela recuando para a horizontal de onde veio
          .to(shapeBg, {
            x: isEven ? -400 : 400,
            opacity: 0,
            rotation: isEven ? -45 : 90,
            duration: 1,
            ease: 'power1.in',
          })
      }

      // --- PARALLAX SUTIL PARA OS OUTROS ELEMENTOS ---
      if (mainCard) {
        gsap.from(mainCard, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: cluster,
            start: 'top 80%',
          },
        })
      }

      if (dotsFg) {
        gsap.to(dotsFg, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: { trigger: cluster, scrub: 1 },
        })
      }

      if (caption) {
        gsap.to(caption, {
          yPercent: isEven ? -50 : 50,
          ease: 'none',
          scrollTrigger: { trigger: cluster, scrub: 1 },
        })
      }
    })
  }, academicRef.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div
    ref="academicRef"
    class="academic-wrapper bg-surface-ground pt-8 pb-4 overflow-hidden font-sans"
  >
    <div class="text-center mb-8">
      <h2 class="text-5xl font-bold text-primary section-title">{{ t('education.title') }} 🎸</h2>
    </div>

    <template v-for="(course, index) in tm('education.academic')" :key="'acad-' + index">
      <section
        class="cluster-section cluster relative w-full flex justify-content-center align-items-center mt-8"
      >
        <div
          v-if="Number(index) % 2 === 0"
          class="shape-bg circle bg-indigo-600 absolute z-0"
        ></div>
        <img
          v-else
          class="shape-bg triangle absolute z-0"
          src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/triangle_448x446.svg"
          alt="Triangle"
        />

        <div class="main-card w-11 md:w-8 max-w-4xl relative z-2">
          <div
            class="p-6 md:p-8 border-round-2xl shadow-8 bg-surface-card border-1 border-white-alpha-10 glass-card relative"
          >
            <h3
              class="caption absolute font-medium text-xl md:text-2xl text-400 z-3 w-full line-height-3"
              style="top: -45px; left: 10px; text-shadow: 0 5px 15px rgba(0, 0, 0, 0.9)"
            >
              <span class="text-primary font-bold text-white">🎓 {{ rt(course.course) }}</span>
              em {{ rt(course.institution) }} ({{ rt(course.period) }}).
            </h3>
            <p v-if="rt(course.description)" class="text-xl text-400 line-height-3 m-0">
              {{ rt(course.description) }}
            </p>

            <div class="absolute text-5xl" style="top: -25px; right: 20px">
              {{ Number(index) % 2 === 0 ? '🐈' : '🐈‍⬛' }}
            </div>
          </div>
        </div>

        <img
          v-if="Number(index) % 2 === 0"
          class="dots-fg dotsBlue absolute z-3 opacity-60"
          src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/dots_blue_494x434.svg"
          alt="Dots"
        />
        <img
          v-else
          class="dots-fg dotsWhite absolute z-3 opacity-60"
          src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/dots_white_310x588.svg"
          alt="Dots"
        />
      </section>
    </template>
  </div>
</template>

<style scoped>
.academic-wrapper {
  background: var(--surface-ground);
}

.cluster {
  min-height: 450px;
  margin: 6vh auto 12vh auto;
}

.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
}

/* O "x: 0" do GSAP trará as formas exatamente para estas posições (extremas) */
.circle {
  width: 350px;
  height: 350px;
  border-radius: 50%;
  top: -10%;
  left: 10%; /* Estaciona na extrema esquerda */
  filter: blur(60px);
}

.triangle {
  top: -15%;
  right: 15%; /* Estaciona na extrema direita */
  width: 350px;
}

.dotsBlue,
.dotsWhite {
  bottom: -15%;
  right: 5%;
  width: 200px;
  pointer-events: none;
}
</style>
