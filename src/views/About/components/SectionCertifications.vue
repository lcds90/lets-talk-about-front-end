<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const certsRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Título principal (Substituído para fromTo para garantir execução)
    gsap.fromTo(
      '.certs-title',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.certs-title',
          start: 'top 85%',
        },
      }
    )

    // Brilho Rosa Fixo
    gsap.fromTo(
      '.pink-circle',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 0.3, // Opacidade final original do seu CSS
        duration: 1.5,
        ease: 'back.out(1)',
        scrollTrigger: {
          trigger: '.certs-cluster',
          start: 'top 75%',
        },
      }
    )

    // --- A MÁGICA DA QUICADA (BOUNCE) CORRIGIDA ---
    // Usar fromTo força o GSAP a iniciar os cards no ar (-100px) e invisíveis.
    gsap.fromTo(
      '.cert-item',
      {
        y: -200, // Posição de partida: 150px acima do local final
        opacity: 0,
      },
      {
        y: 0, // Posição de aterragem: O local original do CSS
        opacity: 1,
        duration: 2, // Tempo suficiente para a física do bounce brilhar
        ease: 'bounce.out', // Efeito de quique no chão
        stagger: 0.3, // Um card cai a cada 0.15 segundos
        scrollTrigger: {
          trigger: '.certs-grid',
          start: 'top 80%', // Inicia quando o topo da grelha chega a 80% do ecrã
          // toggleActions faz com que a animação desfaça se rolar para cima,
          // permitindo que você veja os cards a quicar as vezes que quiser!
          toggleActions: 'play reverse play reverse',
        },
      }
    )

    // Parallax dos Dots
    gsap.to('.certs-dots', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.certs-cluster',
        scrub: 1,
      },
    })
  }, certsRef.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="certsRef" class="certs-wrapper bg-surface-ground pb-8 overflow-hidden font-sans">
    <section class="mb-4 pt-4 px-4 relative z-2">
      <div
        class="certs-title text-center text-2xl md:text-4xl text-400 max-w-4xl mx-auto line-height-3"
        style="font-family: 'Libre Baskerville', serif"
      >
        <span class="font-bold text-pink-500">{{ t('education.certsTitle') }}</span>
        <span class="text-white"> conquistas que validam a minha stack técnica.</span>
      </div>
    </section>

    <section
      class="certs-cluster relative w-full flex justify-content-center align-items-center mt-6 pb-6"
    >
      <div class="pink-circle circle bg-pink-600 absolute z-0"></div>

      <div class="main-card w-11 max-w-6xl relative z-2">
        <div
          class="p-6 border-round-2xl shadow-8 bg-surface-card border-1 border-white-alpha-10 glass-card relative overflow-hidden"
        >
          <div class="certs-grid">
            <div
              v-for="(cert, index) in tm('education.certs')"
              :key="'cert-' + index"
              class="cert-item flex flex-column align-items-center gap-3 p-3 border-round bg-black-alpha-20 hover:bg-black-alpha-40 transition-colors"
            >
              <span class="text-3xl">{{ rt(cert.icon) }}</span>
              <div>
                <h4 class="m-0 text-lg font-bold text-800">{{ rt(cert.name) }}</h4>
                <span class="text-sm text-500 uppercase">{{ rt(cert.date) }}</span>
              </div>
              <div>
                <span>
                  <a
                    v-if="cert.link"
                    :href="cert.link"
                    target="_blank"
                    class="text-primary text-sm font-bold ml-2 hover:underline"
                    >{{ t('education.view') }}</a
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        class="certs-dots dotsBlue absolute z-3 opacity-60"
        src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/dots_blue_494x434.svg"
        alt="Dots"
      />
    </section>
  </div>
</template>

<style scoped>
.certs-wrapper {
  background: var(--surface-ground);
}

.certs-cluster {
  min-height: 400px;
}

.glass-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
}

.circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  top: 10%;
  left: 20%;
  opacity: 0.3;
  filter: blur(60px);
}

.dotsBlue {
  bottom: -10%;
  right: 10%;
  width: 250px;
  pointer-events: none;
}

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
</style>
