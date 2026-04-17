<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const contactRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Animação de entrada do card (salto suave)
    gsap.from('.contact-card', {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 85%',
      },
    })

    // 2. Animação em cascata (stagger) para os botões sociais e de música
    gsap.from('.social-btn', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
      },
    })

    // 3. Efeito "ronronar" (respiração suave) para o gato dormindo
    gsap.to('.sleeping-cat', {
      scale: 1.05,
      yoyo: true,
      repeat: -1,
      duration: 2,
      ease: 'sine.inOut',
    })
  }, contactRef.value ?? undefined)

  return () => ctx.revert() // Limpeza do GSAP
})
</script>

<template>
  <section ref="contactRef" class="contact-section py-8 px-4 md:px-8 relative">
    <div class="container mx-auto max-w-5xl relative z-1 mt-6">
      <div
        class="contact-card p-5 md:p-7 border-round bg-primary-reverse shadow-4 text-center relative border-1 border-200"
      >
        <div
          class="sleeping-cat absolute text-6xl"
          style="top: -45px; left: 50%; transform: translateX(-50%); user-select: none"
        >
          🐈
        </div>

        <h2 class="text-4xl font-bold mb-3 text-primary">
          {{ t('contact.title') }}
        </h2>

        <p class="text-xl text-600 mb-6 max-w-30rem mx-auto line-height-3">
          {{ t('contact.subtitle') }}
        </p>

        <div class="flex flex-wrap justify-content-center gap-4 mb-6">
          <a
            href="https://api.whatsapp.com/send?phone=5511949040112"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-green-500 hover:bg-green-400 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-whatsapp text-xl"></i>
            <span>{{ t('contact.whatsapp_label') }}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/lcds90/"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-blue-600 hover:bg-blue-500 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-linkedin text-xl"></i>
            <span>{{ t('contact.linkedin_label') }}</span>
          </a>

          <a
            href="https://github.com/lcds90"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-gray-800 hover:bg-gray-700 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-github text-xl"></i>
            <span>{{ t('contact.github_label') }}</span>
          </a>

          <a
            href="mailto:lcds90@gmail.com"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round border-1 border-primary text-primary hover:bg-primary hover:text-white font-bold no-underline transition-colors shadow-1"
          >
            <i class="pi pi-envelope text-xl"></i>
            <span>{{ t('contact.email_label') }}</span>
          </a>
        </div>

        <div class="border-top-1 border-300 w-full max-w-20rem mx-auto mb-5"></div>

        <p class="text-600 font-medium mb-4">{{ t('contact.music_subtitle') }}</p>

        <div class="flex flex-wrap justify-content-center gap-4">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-red-600 hover:bg-red-500 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-youtube text-xl"></i>
            <span>{{ t('contact.youtube_label') }}</span>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-purple-600 hover:bg-purple-500 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-headphones text-xl"></i>
            <span>{{ t('contact.bandlab_label') }}</span>
          </a>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn flex align-items-center gap-2 px-4 py-3 border-round bg-orange-500 hover:bg-orange-400 text-white font-bold no-underline transition-colors shadow-2"
          >
            <i class="pi pi-sparkles text-xl"></i>
            <span>{{ t('contact.suno_label') }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
}

.social-btn {
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-3px);
}

.sleeping-cat {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
}
</style>
