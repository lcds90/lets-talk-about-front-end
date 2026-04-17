<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

import SectionMe from './components/SectionMe.vue'
import SectionAbout from './components/SectionAbout.vue'
import SectionExperience from './components/SectionExperience.vue'
import SectionEducation from './components/SectionEducation.vue'
import SectionContact from './components/SectionContact.vue'
import SectionLanguages from './components/SectionLanguages.vue'

const mainContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    // Animação da Linha de Conexão (Cabo de Áudio/Tech) [cite: 60, 91]
    // Ela começa após o Hero e atravessa as seções seguintes
    gsap.to('.connection-line', {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.main-content-flow',
        start: 'top center',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Efeito de "Parallax" nas patinhas que aparecem pelo caminho [cite: 63, 65]
    gsap.to('.global-cat-path', {
      y: -100,
      rotation: 10,
      scrollTrigger: {
        trigger: '.main-content-flow',
        scrub: 2,
      },
    })
  }, mainContainer.value ?? undefined)

  return () => ctx.revert() // Garante limpeza ao destruir o componente
})
</script>

<template>
  <div ref="mainContainer" class="portfolio-wrapper">
    <SectionMe />

    <div class="main-content-flow relative">
      <div class="connection-line-container">
        <div class="connection-line"></div>
      </div>

      <SectionAbout />
      <SectionLanguages />
      <SectionContact />
      <SectionExperience />
      <SectionEducation />
      <div class="global-cat-path" aria-hidden="true">🐾</div>
      <div class="spacer py-8"></div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-wrapper {
  background: #0f172a; /* Dark theme minimalista [cite: 77] */
  color: #f8fafc;
  overflow-x: hidden;
}

.main-content-flow {
  position: relative;
  width: 100%;
}

.connection-line-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: 2px;
  z-index: 1;
}

.connection-line {
  width: 100%;
  height: 0; /* Controlado pelo GSAP ScrollTrigger [cite: 65, 91] */
  background: linear-gradient(to bottom, #6366f1, #ec4899, #10b981);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
}

.global-cat-path {
  position: fixed;
  right: 5%;
  top: 50%;
  font-size: 3rem;
  opacity: 0.2;
  pointer-events: none;
  z-index: 0;
}

.spacer {
  height: 20vh;
}
</style>
