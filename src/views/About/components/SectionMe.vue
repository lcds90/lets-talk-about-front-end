<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const heroContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // Animação de Entrada: Sobe suavemente com fade
    gsap.from('.hero-content', {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: 'power4.out',
    })

    // Animação sutil de flutuação no emoji de guitarra (vibe musical)
    gsap.to('.guitar-emoji', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, heroContainer.value ?? undefined)

  return () => ctx.revert()
})
</script>

<template>
  <section
    ref="heroContainer"
    class="hero-section min-h-screen flex align-items-center justify-content-center"
  >
    <div class="hero-content text-center px-4">
      <h1 class="text-6xl md:text-8xl font-bold mb-4">
        {{ t('hero.name') }}
        <span class="guitar-emoji inline-block">🎸</span>
      </h1>

      <p class="text-xl md:text-2xl text-400 font-medium tracking-tight">
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
  background: transparent; /* O fundo escuro pode ficar no App.vue ou Layout */
  color: #f8fafc;
  position: relative;
  overflow: hidden;
}

.hero-content {
  z-index: 10;
}

.guitar-emoji {
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4));
}

/* Estilo para o PrimeIcons se estiver usando */
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
