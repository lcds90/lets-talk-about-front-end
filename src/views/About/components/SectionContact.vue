<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Animação de Entrada Épica do Card
    gsap.from('.contact-card', {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationX: 5,
      duration: 1.2,
      ease: 'elastic.out(1, 0.7)',
    })

    // 2. Animação de Entrada em Cascata dos Botões
    gsap.from('.social-btn', {
      opacity: 0,
      y: 40,
      scale: 0.5,
      duration: 0.8,
      stagger: {
        amount: 0.5,
        from: 'center', // Entram a partir do centro para fora
      },
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.contact-card',
        start: 'top 75%',
      },
      onComplete: () => {
        // --- ANIMAÇÕES PERPÉTUAS APÓS A ENTRADA ---

        // A. Pulsar dos botões (Ritmo cardíaco/musical)
        gsap.to('.social-btn', {
          scale: 1.05,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.1,
            from: 'edges', // Ondulação de fora para dentro
          },
          ease: 'sine.inOut',
        })

        // B. As Estrelas e Notas a Saltar (Magic Sparks)
        const sparks = gsap.utils.toArray('.sparkle') as HTMLElement[]
        sparks.forEach((spark) => {
          // Posições aleatórias para dar um ar caótico e divertido
          const randomX = gsap.utils.random(-30, 30)
          const randomY = gsap.utils.random(-40, -10)
          const randomRotation = gsap.utils.random(-45, 45)
          const randomDuration = gsap.utils.random(0.6, 1.2)

          gsap.fromTo(
            spark,
            { y: 0, x: 0, opacity: 1, scale: 0.5, rotation: 0 },
            {
              y: randomY,
              x: randomX,
              opacity: 0,
              scale: 1.5,
              rotation: randomRotation,
              duration: randomDuration,
              ease: 'power1.out',
              repeat: -1,
              delay: gsap.utils.random(0, 1), // Cada faísca salta no seu tempo
            }
          )
        })
      },
    })

    // 3. O Gato Dormindo (A ressonar)
    gsap.to('.sleeping-cat', {
      scale: 1.1,
      y: -5,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: 'sine.inOut',
    })

    // O ZZZ do gato a flutuar
    gsap.to('.zzz-text', {
      y: -20,
      x: 10,
      opacity: 0,
      duration: 2,
      repeat: -1,
      ease: 'power1.inOut',
      stagger: 0.5,
    })
  }, contactRef.value ?? undefined)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section ref="contactRef" class="contact-section py-8 px-4 md:px-8 relative overflow-hidden">
    <div class="container mx-auto max-w-5xl relative z-1 mt-8">
      <div
        class="contact-card p-5 md:p-8 border-round-3xl bg-primary-reverse shadow-8 text-center relative border-1 border-white-alpha-20 glass-card"
      >
        <div class="absolute" style="top: -55px; left: 50%; transform: translateX(-50%)">
          <div class="relative">
            <span class="sleeping-cat inline-block text-7xl select-none filter-shadow">🪄</span>
            <span
              class="zzz-text absolute text-2xl font-bold text-primary"
              style="top: -10px; right: -20px"
              >⭐</span
            >
            <span
              class="zzz-text absolute text-xl font-bold text-primary"
              style="top: -25px; right: -35px"
              >⭐</span
            >
            <span
              class="zzz-text absolute text-lg font-bold text-primary"
              style="top: -40px; right: -50px"
              >⭐</span
            >
          </div>
        </div>

        <h2 class="text-5xl md:text-6xl font-bold mb-3 text-primary text-shadow">
          {{ t('contact.title') }}
        </h2>

        <p class="text-xl text-400 mb-7 max-w-30rem mx-auto line-height-3">
          {{ t('contact.subtitle') }}
        </p>

        <div class="flex flex-wrap justify-content-center gap-4 mb-7">
          <a
            href="https://api.whatsapp.com/send?phone=5511949040112"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-green-500 hover:bg-green-400 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-whatsapp text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.whatsapp_label') }}</span>
            <span class="sparkle absolute text-yellow-300 z-0">✨</span>
            <span class="sparkle absolute text-white z-0" style="right: 10px">⭐</span>
          </a>

          <a
            href="https://www.linkedin.com/in/lcds90/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-blue-600 hover:bg-blue-500 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-linkedin text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.linkedin_label') }}</span>
            <span class="sparkle absolute text-blue-200 z-0">✨</span>
            <span class="sparkle absolute text-white z-0" style="right: 15px">⭐</span>
          </a>

          <a
            href="https://github.com/lcds90"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-gray-800 hover:bg-gray-700 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-github text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.github_label') }}</span>
            <span class="sparkle absolute text-gray-300 z-0">💻</span>
            <span class="sparkle absolute text-white z-0" style="right: 20px">✨</span>
          </a>

          <a
            href="mailto:lcds90@gmail.com"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold no-underline shadow-4 transition-colors transition-duration-300"
          >
            <i class="pi pi-envelope text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.email_label') }}</span>
            <span class="sparkle absolute text-pink-300 z-0">✉️</span>
          </a>
        </div>

        <div class="border-top-1 border-white-alpha-20 w-full max-w-20rem mx-auto mb-6 relative">
          <span
            class="absolute bg-surface-card px-2"
            style="top: -12px; left: 50%; transform: translateX(-50%)"
            >🎵</span
          >
        </div>

        <p class="text-400 font-medium mb-5 text-xl tracking-widest uppercase">
          {{ t('contact.music_subtitle') }}
        </p>

        <div class="flex flex-wrap justify-content-center gap-4">
          <a
            v-if="false"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-red-600 hover:bg-red-500 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-youtube text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.youtube_label') }}</span>
            <span class="sparkle absolute text-yellow-300 z-0">🔥</span>
            <span class="sparkle absolute text-white z-0" style="right: 15px">🎵</span>
          </a>

          <a
            href="https://www.bandlab.com/lcds90"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-purple-600 hover:bg-purple-500 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-headphones text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.bandlab_label') }}</span>
            <span class="sparkle absolute text-purple-200 z-0">🎶</span>
            <span class="sparkle absolute text-white z-0" style="right: 10px">🎧</span>
          </a>

          <a
            href="https://suno.com/@lcds"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn relative flex align-items-center gap-2 px-5 py-3 border-round-xl bg-orange-500 hover:bg-orange-400 text-white font-bold no-underline shadow-4"
          >
            <i class="pi pi-sparkles text-2xl z-1"></i>
            <span class="z-1 text-lg">{{ t('contact.suno_label') }}</span>
            <span class="sparkle absolute text-yellow-200 z-0">✨</span>
            <span class="sparkle absolute text-orange-200 z-0" style="right: 20px">⭐</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: transparent;
}

.glass-card {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
}

.text-shadow {
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
}

.filter-shadow {
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.6));
}

.social-btn {
  /* Impede que as estrelas saiam dos botões horizontalmente quebrando o layout */
  overflow: visible;
  /* Adiciona um efeito hover suave para complementar a animação do GSAP */
  transition: filter 0.3s ease;
}

.social-btn:hover {
  filter: brightness(1.1);
}

/* Esconde as estrelas até que o GSAP as assuma */
.sparkle {
  top: 10px;
  left: 20px;
  pointer-events: none;
  user-select: none;
}
</style>
