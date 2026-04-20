<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
gsap.registerPlugin(ScrollTrigger)

const horizontalSection = ref<HTMLElement | null>(null)
const pinWrap = ref<HTMLElement | null>(null)
const animWrap = ref<HTMLElement | null>(null)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    if (!animWrap.value || !horizontalSection.value || !pinWrap.value || !window) return

    const getToValue = () => -(animWrap.value!.scrollWidth - window.innerWidth)

    // 1. Guardamos a animação horizontal numa variável para servir de referência
    const horizontalTween = gsap.fromTo(
      animWrap.value,
      { x: 0 },
      {
        x: () => getToValue(),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection.value,
          start: 'top top',
          end: () => '+=' + animWrap.value!.scrollWidth,
          pin: pinWrap.value,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      }
    )

    // 2. Animação de entrada dos cards e ícones
    gsap.utils.toArray('.synth-panel').forEach((panel: any) => {
      gsap.from(panel, {
        opacity: 0.2,
        scale: 0.9,
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalTween, // Dizemos que ele vive dentro do scroll horizontal
          start: 'left center',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // 3. A Onda Felina (Os gatos pulando um a um)
    gsap.to('.jump-cat', {
      y: -120, // Altura do pulo
      rotation: 15, // Dá um grauzinho no ar
      ease: 'sine.inOut',
      stagger: {
        each: 0.15, // Tempo entre o pulo de cada gato
        yoyo: true, // Faz eles voltarem para o chão
        repeat: 1,
      },
      scrollTrigger: {
        trigger: '.transition-cats',
        containerAnimation: horizontalTween,
        start: 'left 75%', // Começa a pular quando a seção chega a 75% da tela
        end: 'right 25%',
        scrub: 1, // Scrub cria a dependência da velocidade do scroll do usuário
      },
    })

    // 4. A Escala Musical (As notas flutuando um a um)
    gsap.to('.jump-note', {
      y: -100,
      scale: 1.3, // Crescem quando tocam "no alto"
      rotation: -15,
      ease: 'sine.inOut',
      stagger: {
        each: 0.15,
        yoyo: true,
        repeat: 1,
      },
      scrollTrigger: {
        trigger: '.transition-notes',
        containerAnimation: horizontalTween,
        start: 'left 75%',
        end: 'right 25%',
        scrub: 1,
      },
    })
  }, horizontalSection.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="horizontalSection" class="horizontal bg-surface-ground">
    <div ref="pinWrap" class="pin-wrap">
      <div ref="animWrap" class="animation-wrap">
        <!--         <div class="panel intro-panel flex flex-column justify-content-center px-4 md:px-8">
          <div class="section-header mb-6">
            <h2 class="text-5xl md:text-7xl font-bold mb-3 flex align-items-center gap-4">
              <span class="text-primary">{{ t('about.title') }}</span>
              <span class="music-note inline-block">🎹</span>
            </h2>
            <p class="text-xl md:text-2xl text-500 font-medium tracking-wide uppercase">
              {{ t('about.subtitle') }}
            </p>
          </div>

          <div class="glass-panel p-5 border-round-2xl relative overflow-hidden max-w-4xl">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>
            <p class="text-xl leading-relaxed mb-4 text-300" v-html="t('about.p1')"></p>
            <p class="text-xl leading-relaxed mb-4 text-300">
              {{ t('about.p2', { company: 'Zenvia' }) }}
            </p>
            <p class="text-xl leading-relaxed text-300">
              {{ t('about.p3') }}
            </p>
          </div>
        </div> -->

        <div class="panel synth-panel flex align-items-center justify-content-center">
          <div
            class="synth-card p-6 border-round-2xl relative flex flex-column align-items-center text-center gap-3 shadow-8 w-20rem"
          >
            <div
              class="led-indicator bg-indigo-500 shadow-indigo h-4rem w-1rem border-round-xl mb-2"
            ></div>
            <div class="icon-glow text-indigo-400 mb-2">
              <i class="pi pi-desktop text-5xl"></i>
            </div>
            <span class="text-sm text-500 uppercase font-bold tracking-widest mt-2">
              {{ t('about.stats.stack') }}
            </span>
            <span class="text-2xl font-bold text-900">{{ t('about.stats.stack_desc') }}</span>
          </div>
        </div>

        <div
          class="transition-cats flex align-items-center justify-content-center gap-4 px-6 text-6xl md:text-7xl w-30vw"
        >
          <span class="jump-cat inline-block">🐈</span>
          <span class="jump-cat inline-block">🐈‍⬛</span>
          <span class="jump-cat inline-block">🐈</span>
          <span class="jump-cat inline-block">🐈‍⬛</span>
          <span class="jump-cat inline-block">🐈</span>
        </div>

        <div class="panel synth-panel flex align-items-center justify-content-center relative">
          <div
            class="synth-card p-6 border-round-2xl relative z-1 flex flex-column align-items-center text-center gap-3 shadow-8 w-20rem"
          >
            <div
              class="led-indicator bg-pink-500 shadow-pink h-4rem w-1rem border-round-xl mb-2"
            ></div>
            <div class="icon-glow text-pink-400 mb-2">
              <i class="pi pi-headphones text-5xl"></i>
            </div>
            <span class="text-sm text-500 uppercase font-bold tracking-widest mt-2">
              {{ t('about.stats.vibe') }}
            </span>
            <span class="text-2xl font-bold text-900">{{ t('about.stats.vibe_desc') }}</span>

            <div class="eq-bars flex align-items-end gap-2 h-3rem mt-2">
              <span class="bar bg-pink-500 w-1rem"></span>
              <span class="bar bg-pink-500 w-1rem"></span>
              <span class="bar bg-pink-500 w-1rem"></span>
              <span class="bar bg-pink-500 w-1rem"></span>
            </div>
          </div>
        </div>

        <div
          class="transition-notes flex align-items-center justify-content-center gap-4 px-6 text-6xl md:text-7xl w-30vw"
        >
          <span class="jump-note inline-block">🎼</span>
          <span class="jump-note inline-block">🎤</span>
          <span class="jump-note inline-block">🎹</span>
          <span class="jump-note inline-block">🎶</span>
          <span class="jump-note inline-block">🎵</span>
        </div>

        <div class="panel synth-panel flex align-items-center justify-content-center pr-8 pb-24">
          <div
            class="synth-card p-6 border-round-2xl relative flex flex-column align-items-center text-center gap-3 shadow-8 w-20rem"
          >
            <div
              class="led-indicator bg-emerald-500 shadow-emerald h-4rem w-1rem border-round-xl mb-2"
            ></div>
            <div class="icon-glow text-emerald-400 mb-2">
              <i class="pi pi-bolt text-5xl"></i>
            </div>
            <span class="text-sm text-500 uppercase font-bold tracking-widest mt-2">
              {{ t('about.stats.focus') }}
            </span>
            <span class="text-2xl font-bold text-900">{{ t('about.stats.focus_desc') }}</span>
          </div>
        </div>

        <div class="panel spacer py-24 px-24"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import 'primeicons/primeicons.css'; /* Garantindo os ícones Neon! */

.horizontal {
  overflow-x: hidden;
  position: relative;
}

.pin-wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.animation-wrap {
  display: flex;
  height: 100%;
  align-items: center;
  width: max-content;
  padding-left: 5vw;
}

.panel {
  height: 100%;
  min-width: 60vw;
  overflow: hidden;
}

.spacer {
  width: 15rem;
  height: 15rem;
  display: block;
  /* background: red; */
}

/* Tamanho dos containers de transição */
.w-30vw {
  min-width: 40vw; /* Dá um respiro bom entre os cards */
}

@media (max-width: 768px) {
  .panel {
    min-width: 90vw;
  }
  .w-30vw {
    min-width: 80vw;
  }
}

/* === ANIMAÇÕES BASE === */

/* Efeito Drop Shadow para dar profundidade aos emojis nas transições */
.jump-cat,
.jump-note {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.4));
  user-select: none;
}

.music-note {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

.glass-panel {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.bg-gradient-primary {
  background: linear-gradient(90deg, #6366f1, #ec4899);
}

.synth-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
}

.synth-card:hover {
  background: rgba(30, 41, 59, 0.9);
  transform: translateY(-10px);
  border-color: rgba(255, 255, 255, 0.2);
}

.led-indicator {
  transition: all 0.3s ease;
  opacity: 0.8;
}
.synth-card:hover .led-indicator {
  opacity: 1;
  transform: scaleY(1.2);
}

.icon-glow i {
  transition: all 0.4s ease;
  filter: drop-shadow(0 0 5px currentColor);
}
.synth-card:hover .icon-glow i {
  transform: scale(1.15);
  filter: drop-shadow(0 0 15px currentColor);
}

.shadow-indigo {
  box-shadow:
    0 0 15px #6366f1,
    0 0 30px #6366f1;
}
.shadow-pink {
  box-shadow:
    0 0 15px #ec4899,
    0 0 30px #ec4899;
}
.shadow-emerald {
  box-shadow:
    0 0 15px #10b981,
    0 0 30px #10b981;
}

.peeking-cat {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.5));
  animation: peek 4s infinite ease-in-out;
}

@keyframes peek {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(-10deg);
  }
}

.eq-bars .bar {
  border-radius: 4px 4px 0 0;
  animation: equalize 1s infinite alternate ease-in-out;
}

.eq-bars .bar:nth-child(1) {
  height: 40%;
  animation-delay: 0.1s;
}
.eq-bars .bar:nth-child(2) {
  height: 80%;
  animation-delay: 0.3s;
}
.eq-bars .bar:nth-child(3) {
  height: 60%;
  animation-delay: 0.2s;
}
.eq-bars .bar:nth-child(4) {
  height: 90%;
  animation-delay: 0.4s;
}

@keyframes equalize {
  0% {
    height: 30%;
  }
  100% {
    height: 100%;
  }
}
</style>
