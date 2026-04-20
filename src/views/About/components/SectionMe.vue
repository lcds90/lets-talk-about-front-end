<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
gsap.registerPlugin(ScrollTrigger)

// Referências para o DOM
const heroContainer = ref<HTMLElement | null>(null)
const markGhost = ref<HTMLElement | null>(null) // Elemento invisível estático para medir
const dotExpand = ref<HTMLElement | null>(null) // O círculo colorido que vai expandir

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Setup Inicial do Ponto (A "Singularidade")
    gsap.set(dotExpand.value, {
      width: '150vmax', // Garante que cobre todos os cantos
      height: '150vmax',
      xPercent: -50,
      yPercent: -50,
      top: '50%',
      left: '50%',
      scale: 0,
      // --- SETUP INICIAL DA IMAGEM ---
      backgroundImage: "url('/eu.png')",
      backgroundRepeat: 'repeat',
      backgroundSize: '10% 10%', // Começa como um mosaico minúsculo
      backgroundPosition: '50% 20%',
      filter: 'brightness(1.5) contrast(1.1)', // Um pouco de "estouro" de luz no início
    })

    // 2. Animação de Entrada Normal (Fade e Float)
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2, // Ritmo musical
      ease: 'power4.out',
    })

    // Flutuação dos Emojis
    gsap.to('.guitar-emoji', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // 3. Timeline Principal do ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5, // Vínculo suave com o scroll
        pin: heroContainer.value,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'none' },
    })

    // A Timeline: Desvanece o conteúdo e expande/anima o "Portal" da imagem
    tl.to(
      '.hero-content',
      {
        opacity: 0.75,
        scale: 0.5,
        duration: 0.6,
        x: -200,
        y: 200,
      },
      0
    )
      .to(
        '.hero-content h1',
        {
          color: 'rgb(0,0,0)', // Desaparece completamente
        },
        '<'
      )

      // --- A MÁGICA DA IMAGEM ANIMADA ---
      .fromTo(
        dotExpand.value,
        {
          scale: 0,
          rotation: -15, // Começa girando
          x: () => {
            if (!markGhost.value || !heroContainer.value) return 0
            const markBounds = markGhost.value.getBoundingClientRect()
            const sectionBounds = heroContainer.value.getBoundingClientRect()
            const px = markBounds.left + markBounds.width / 2
            return px - sectionBounds.width / 2
          },
          y: () => {
            if (!markGhost.value || !heroContainer.value) return 0
            const markBounds = markGhost.value.getBoundingClientRect()
            const sectionBounds = heroContainer.value.getBoundingClientRect()
            const py = markBounds.top + markBounds.height / 2
            return py - sectionBounds.height / 2
          },
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0, // Resolve a rotação
          ease: 'power4.in',
          duration: 1,
        },
        '<0.1' // Começa logo após o início do fade do texto
      )

      // Concorrentemente, animamos o interior da imagem
      .to(
        dotExpand.value,
        {
          // O mosaico se resolve em uma imagem única (cobertura total)
          backgroundSize: '130%',
          // Efeito Ken Burns sutil (foco desliza para uma diagonal)
          backgroundPosition: '65% 40%',
          // Retorna a imagem à cor normal
          filter: 'brightness(1) contrast(1)',
          ease: 'power2.inOut',
          duration: 1,
        },
        '<0.5'
      ) // Executa junto com a animação de scale acima
  }, heroContainer.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section
    ref="heroContainer"
    class="hero-section min-h-screen flex align-items-center justify-content-center overflow-hidden"
  >
    <div ref="dotExpand" class="dot-expander border-circle absolute z-1 shadow-8"></div>

    <div class="hero-content text-center px-4 relative z-2">
      <h1 class="text-3xl md:text-6xl font-bold mb-4 relative">
        {{ t('hero.name') }}
        <span class="nickname text-secondary text-sm font-italic absolute opacity-70">
          ({{ t('hero.nickname') }})
        </span>
        <span class="emoji-wrapper inline-block relative">
          <span class="guitar-emoji absolute left-0 top-0 w-full h-full">🎼👨🏽‍💻</span>
          <span ref="markGhost" class="ghost-emoji opacity-0 pointer-events-none">🎼👨🏽‍💻</span>
        </span>
      </h1>

      <p class="text-xl md:text-2xl text-primary font-medium tracking-tight mt-6">
        {{ t('hero.role') }}
      </p>

      <div class="scroll-indicator mt-8 text-whiteopacity-70">
        <i class="pi pi-chevron-down text-3xl"></i>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: transparent;
  position: relative;
  height: 100vh;
}

.dot-expander {
  /* Removemos as definições de imagem daqui para o GSAP gerenciar */
  will-change: transform, background-size, background-position;
  pointer-events: none; /* Não atrapalha cliques se houver algo atrás futuramente */
}

.emoji-wrapper {
  display: inline-block;
  min-width: 1em;
}

.guitar-emoji {
  filter: drop-shadow(0 0 15px var(--primary-color));
}

.scroll-indicator {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-12px);
  }
  60% {
    transform: translateY(-6px);
  }
}

.nickname {
  bottom: -2rem;
  left: 0;
}
</style>
