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

    gsap.to('.jump-code', {
      y: -80,
      scale: 1.2,
      rotation: 10,
      ease: 'sine.inOut',
      stagger: {
        each: 0.15,
        yoyo: true,
        repeat: 1,
      },
      scrollTrigger: {
        trigger: '.transition-code',
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

        <div class="panel synth-panel flex align-items-center justify-content-center pb-24">
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

        <div
          class="transition-code flex align-items-center justify-content-center gap-4 px-6 text-6xl md:text-7xl w-30vw"
        >
          <span class="jump-code inline-block">💻</span>
          <span class="jump-code inline-block">👨🏽‍💻</span>
          <span class="jump-code inline-block">📶</span>
          <span class="jump-code inline-block">🌐</span>
          <span class="jump-code inline-block">🚀</span>
        </div>

        <div class="panel synth-panel flex align-items-center justify-content-center">
          <div
            class="synth-card p-5 md:p-6 border-round-2xl relative flex flex-column md:flex-row align-items-center justify-content-center gap-5 md:gap-7 shadow-8 w-auto max-w-full"
          >
            <div class="flex flex-column align-items-center text-center w-15rem">
              <div
                class="led-indicator bg-cyan-500 shadow-cyan h-4rem w-1rem border-round-xl mb-3"
              ></div>

              <div class="icon-glow text-cyan-400 mb-2">
                <i class="pi pi-code text-5xl"></i>
              </div>

              <span class="text-sm text-500 uppercase font-bold tracking-widest mt-2">
                {{ t('about.stats.code') }}
              </span>

              <a
                href="https://wakatime.com/@lcds90"
                target="_blank"
                class="text-cyan-400 hover:text-cyan-200 transition-colors text-sm font-medium flex align-items-center gap-2 no-underline mt-3 border-1 border-cyan-800 border-round-3xl px-3 py-2"
              >
                {{ t('about.stats.code_desc') }} <i class="pi pi-external-link text-xs"></i>
              </a>
            </div>

            <div class="hidden md:block h-10rem border-left-1 border-gray-700"></div>

            <div
              class="border-round-lg overflow-hidden bg-gray-900 border-1 border-gray-800 flex-shrink-0"
              style="width: 320px"
            >
              <img
                src="https://camo.githubusercontent.com/d93e830960b9a678db5359a5e1ebb890c4ff94592cfacb5f18e967f39996bac6/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170692f77616b6174696d653f757365726e616d653d6c6364733930267468656d653d746f6b796f6e69676874266c61796f75743d636f6d70616374"
                alt="Wakatime Stats"
                class="w-full block"
              />
            </div>
          </div>
        </div>
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
  padding-left: 10vw;
  padding-right: 15vw;
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

.shadow-cyan {
  box-shadow:
    0 0 15px #06b6d4,
    0 0 30px #06b6d4;
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
