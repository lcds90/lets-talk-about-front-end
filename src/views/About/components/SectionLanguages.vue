<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'

const { t, tm, rt } = useI18n()
const langSectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Animação de entrada dos cards (Surgem de baixo com fade)
    gsap.from('.lang-card', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.languages-section',
        start: 'top 85%',
      },
    })

    // 2. Animação contínua das bandeiras ("Waving")
    gsap.to('.animated-flag', {
      rotation: 12, // Inclinação da bandeira
      transformOrigin: 'bottom right', // Ponto de âncora na base
      yoyo: true, // Vai e volta
      repeat: -1, // Loop infinito
      duration: 1.5,
      ease: 'sine.inOut', // Movimento suave e rítmico
      stagger: 0.3, // As bandeiras não balançam exatamente ao mesmo tempo
    })
  }, langSectionRef.value ?? undefined)

  return () => ctx.revert() // Limpeza do contexto GSAP
})
</script>

<template>
  <section ref="langSectionRef" class="languages-section py-8 px-4 md:px-8 relative">
    <div class="container mx-auto max-w-5xl">
      <h2 class="text-4xl font-bold mb-8 text-primary text-center">
        {{ t('languages.title') }}
      </h2>

      <div class="grid justify-content-center gap-4">
        <div v-for="(lang, index) in tm('languages.items')" :key="index" class="col-12 md:col-5">
          <div
            class="lang-card p-4 border-round surface-card shadow-2 flex align-items-center gap-4 border-1 border-200 hover:border-primary transition-colors transition-duration-300 h-full bg-primary-reverse"
          >
            <div class="flag-container text-6xl md:text-7xl">
              <span class="animated-flag inline-block">{{ rt(lang.flag) }}</span>
            </div>

            <div>
              <h3 class="text-2xl font-bold m-0 text-800">{{ rt(lang.name) }}</h3>

              <span
                class="text-primary font-bold text-sm uppercase tracking-wide inline-block mb-2 mt-1"
              >
                {{ rt(lang.level) }}
              </span>

              <p v-if="rt(lang.description)" class="m-0 text-600 line-height-3 text-sm">
                {{ rt(lang.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.languages-section {
  background: transparent;
}

.lang-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}

.flag-container {
  /* Impede que a animação cause barras de scroll indesejadas no card */
  overflow: hidden;
  padding: 10px;
}

.animated-flag {
  /* Uma sombra para dar um efeito tátil à bandeira */
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  user-select: none;
}
</style>
