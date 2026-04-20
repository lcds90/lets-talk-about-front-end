<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, tm, rt } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Pegamos todos os clusters (cada experiência é um cluster isolado)
    const clusters = gsap.utils.toArray('.experience-cluster')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clusters.forEach((cluster: any, index: number) => {
      const circle = cluster.querySelector('.decor-circle')
      const dots = cluster.querySelector('.decor-dots')
      const card = cluster.querySelector('.experience-card')
      const caption = cluster.querySelector('.caption-bg')
      const cat = cluster.querySelector('.cat-hunt')

      // dir = 1 (para o primeiro card), dir = -1 (para o segundo card)
      const dir = index % 2 === 0 ? 1 : -1

      /* ------ SETUP INICIAL (Ponto de Partida) ------ */
      gsap.set(circle, { yPercent: -15 * dir, xPercent: -5 * dir })
      gsap.set(card, { yPercent: -10 })
      gsap.set(cluster, { yPercent: 5 })
      if (cat) gsap.set(cat, { yPercent: 10, rotation: -15 })

      // NOVO: Os dots começam lá embaixo (ou lá em cima)
      gsap.set(dots, { yPercent: 100 * dir, rotation: -20 })

      // NOVO: A legenda começa puxada para a esquerda (ou direita)
      gsap.set(caption, { xPercent: -40 * dir })

      /* ------ ANIMAÇÕES DE SCROLL ------ */

      // 1. O Círculo de Fundo
      gsap.to(circle, {
        yPercent: 15 * dir,
        xPercent: 5 * dir,
        ease: 'none',
        scrollTrigger: {
          trigger: cluster,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      // 2. Os "Dots" (Index 0 vai para CIMA, Index 1 vai para BAIXO)
      // Se dir=1 (index 0), começa em 100 e vai para -100 (Sobe)
      // Se dir=-1 (index 1), começa em -100 e vai para 100 (Desce)
      gsap.to(dots, {
        yPercent: -100 * dir,
        rotation: 20 * dir, // Eles também giram em direções opostas!
        ease: 'none',
        scrollTrigger: {
          trigger: cluster,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      // 3. A "Coruja" (Card principal)
      gsap.to(card, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: cluster,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      gsap.set(caption, { xPercent: -60 * dir })

      // 4. A Legenda (Move HORIZONTALMENTE e ESTACIONA no centro)
      gsap.to(caption, {
        xPercent: 0, // 0 significa que ele volta para a posição original (perfeitamente centralizado)
        ease: 'power2.out', // Adiciona um efeito suave de "frenagem" ao chegar no centro
        scrollTrigger: {
          trigger: cluster,
          scrub: 1,
          start: 'top bottom',
          end: 'center center', // A MÁGICA ESTÁ AQUI: A animação termina quando o card chega no meio da tela!
        },
      })
      // 5. O próprio Cluster (Ajuste fino global)
      gsap.to(cluster, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: cluster,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      })

      // 6. O Gato (Move rápido e roda)
      if (cat) {
        gsap.to(cat, {
          yPercent: -40,
          rotation: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: cluster,
            scrub: 1,
            start: 'top bottom',
            end: 'bottom top',
          },
        })
      }
    })
  }, sectionRef.value ?? undefined)
})

// Forma correta e Sênior do Vue para limpar a memória do GSAP
onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section ref="sectionRef" class="experience-section py-8 px-4 md:px-8 relative overflow-hidden">
    <div class="container mx-auto max-w-5xl relative z-1">
      <h2 class="text-5xl font-bold mb-8 text-primary text-center w-full text-center">
        {{ t('experience.title') }}
      </h2>

      <div class="flex flex-column gap-8 mt-8">
        <div
          v-for="(job, index) in tm('experience.jobs')"
          :key="index"
          class="experience-cluster relative w-full py-6 flex justify-content-center"
        >
          <div
            class="caption-bg absolute font-bold text-800 opacity-20 z-0 select-none whitespace-nowrap w-full text-center"
            style="
              font-size: 15vw;
              top: -10%;
              left: 0;
              color: transparent;
              -webkit-text-stroke: 2px var(--surface-400);
              line-height: 15vw;
            "
            :data-index="index"
          >
            {{ rt(job.company) }}
          </div>

          <div
            class="decor-circle absolute z-0"
            :class="Number(index) % 2 === 0 ? 'bg-indigo-600 left-0' : 'bg-pink-600 right-0'"
            style="
              width: 300px;
              height: 300px;
              border-radius: 50%;
              filter: blur(80px);
              opacity: 0.3;
              top: 10%;
            "
          ></div>

          <div
            class="decor-dots absolute text-5xl opacity-40 z-1"
            :style="{ top: '20%', [Number(index) % 2 === 0 ? 'right' : 'left']: '5%' }"
          >
            {{ Number(index) % 2 === 0 ? '🎶 💻' : '🎹 ⚡' }}
          </div>

          <div
            class="experience-card w-full p-5 md:p-7 border-round-2xl bg-primary-reverse shadow-6 border-1 border-200 relative z-2"
            style="max-width: 800px; backdrop-filter: blur(12px)"
          >
            <span
              v-if="job.hasCat"
              class="cat-hunt absolute text-6xl z-5"
              style="top: -30px; right: 20px"
            >
              🐈‍⬛
            </span>

            <div
              class="flex flex-column md:flex-row justify-content-between align-items-start mb-5 gap-3 border-bottom-1 border-300 pb-4"
            >
              <div>
                <h3 class="text-4xl font-bold m-0 text-900">{{ rt(job.company) }}</h3>
                <span class="text-primary font-bold text-xl tracking-wide">{{ rt(job.role) }}</span>
              </div>
              <div class="text-left md:text-right text-600 text-sm">
                <div
                  class="font-bold border-round bg-surface-ground p-2 inline-block mb-2 shadow-1"
                >
                  {{ rt(job.period) }}
                </div>
                <div
                  class="font-medium flex align-items-center gap-2 justify-content-start md:justify-content-end"
                >
                  <i class="pi pi-map-marker text-primary"></i> {{ rt(job.location) }}
                </div>
              </div>
            </div>

            <p v-if="rt(job.description)" class="text-700 text-lg line-height-3 mb-5">
              {{ rt(job.description) }}
            </p>

            <ul class="list-none p-0 m-0 flex flex-column gap-4">
              <li
                v-for="(achievement, aIndex) in job.achievements"
                :key="aIndex"
                class="flex align-items-start gap-3 text-700 line-height-3 text-lg"
              >
                <span class="text-primary mt-1"><i class="pi pi-check-circle"></i></span>
                <span>{{ rt(achievement) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  background: var(--surface-ground);
}

.experience-cluster {
  /* Garante que os elementos filhos em absolute não vazem para as laterais bagunçando o scroll */
  perspective: 1000px;
}

.experience-card {
  background: rgba(255, 255, 255, 0.05); /* Fundo vidro */
}

/* O texto gigante transparente ao fundo */
.caption-bg {
  letter-spacing: -2px;
  pointer-events: none;
}

.cat-hunt {
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));
}
</style>
