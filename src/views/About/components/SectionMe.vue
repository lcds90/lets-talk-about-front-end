<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Referências para o DOM
const heroContainer = ref<HTMLElement | null>(null)
const markGhost = ref<HTMLElement | null>(null) // Elemento invisível estático para medir
const dotExpand = ref<HTMLElement | null>(null) // O círculo colorido que vai expandir

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Setup Inicial do Ponto (Escondido e enorme)
    gsap.set(dotExpand.value, {
      width: '150vmax', // Garante que cobre todos os cantos
      height: '150vmax',
      xPercent: -50,
      yPercent: -50,
      top: '50%',
      left: '50%',
      scale: 0, // Começa invisível
    })

    // 2. Animação de Entrada Normal (Fade e Float)
    // 2. Animação de Entrada Normal (Fade e Float)
    // Usamos o seletor '> *' para animar os filhos (h1, p, ícone) separadamente do pai
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2, // Dá um ritmo musical: entra o título, depois subtítulo, depois a seta
      ease: 'power4.out',
    })

    gsap.to('.guitar-emoji', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // 3. A Mágica do ScrollTrigger (Expansão do Ponto)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5, // Suaviza o vínculo com o scroll
        pin: heroContainer.value, // Prende a secção enquanto o utilizador faz scroll
        pinSpacing: true,
        invalidateOnRefresh: true, // Recalcula posições se redimensionar a janela
        // markers: true, // Remova o comentário para debugar
      },
      defaults: { ease: 'none' },
    })

    // A Timeline: Desvanece o conteúdo e expande o círculo vindo da guitarra
    tl.to(
      '.hero-content',
      {
        scale: 0.9,
        duration: 0.5,
      },
      0
    ) // O '0' diz para começar logo

      .fromTo(
        dotExpand.value,
        {
          scale: 0,
          x: () => {
            // Medimos o fantasma (que não está a flutuar) para garantir precisão
            if (!markGhost.value || !heroContainer.value) return 0
            const markBounds = markGhost.value.getBoundingClientRect()
            const sectionBounds = heroContainer.value.getBoundingClientRect()
            // Calcula a distância do centro do emoji até ao centro do ecrã
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
          scale: 1, // Expande até cobrir tudo
          ease: 'power3.in',
          duration: 1,
        },
        '<0.2'
      ) // Começa logo a seguir ao fade out do texto iniciar
  }, heroContainer.value ?? undefined)
})

// Uso correto do ciclo de vida do Vue para limpar a memória
onUnmounted(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section
    ref="heroContainer"
    class="hero-section min-h-screen flex align-items-center justify-content-center overflow-hidden"
  >
    <div ref="dotExpand" class="dot-expander border-circle absolute z-1"></div>

    <div class="hero-content text-center px-4 relative z-2">
      <h1 class="text-6xl md:text-8xl font-bold mb-4 relative">
        {{ t('hero.name') }}

        <span class="emoji-wrapper inline-block relative">
          <span class="guitar-emoji absolute left-0 top-0 w-full h-full">🎼👨🏽‍💻</span>
          <span ref="markGhost" class="ghost-emoji opacity-0 pointer-events-none">🎼👨🏽‍💻</span>
        </span>
      </h1>

      <p class="text-xl md:text-2xl text-400 font-medium tracking-tight mt-6">
        {{ t('hero.role') }}
      </p>

      <div class="scroll-indicator mt-8 opacity-50">
        <i class="pi pi-chevron-down text-2xl"></i>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: transparent;
  color: #f8fafc;
  position: relative;
  /* Crucial para o ScrollTrigger prender a altura correta */
  height: 100vh;
}

/* A cor do ponto que vai dominar o ecrã.
   Recomendo usar a mesma cor de fundo que você tem na próxima secção (ex: AboutMe)
   para que a transição seja contínua. */
.dot-expander {
  background: #1e293b; /* Cor base mais escura, ajuste para o seu tema */
  /* O gradiente fica espetacular aqui se quiser testar: */
  /* background: radial-gradient(circle, #6366f1 0%, #1e293b 80%); */
  will-change: transform; /* Otimização de performance */
}

.emoji-wrapper {
  /* Mantém o espaço na frase mesmo que a guitarra original seja position absolute */
  display: inline-block;
  min-width: 1em;
}

.guitar-emoji {
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4));
  /* O GSAP não gosta muito de usar translate diretamente no style se ele mesmo for animar com transform.
     O ideal é deixar ele lidar com tudo, mas isso evita conflitos iniciais. */
  transform: translateZ(0);
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
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
</style>
