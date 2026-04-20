<script setup lang="ts">
import { useRouter } from 'vitepress'
import { gsap } from 'gsap'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const { t } = useI18n()

const scrollToTop = () => {
  gsap.to(window, {
    duration: 5,
    scrollTo: 700,
    ease: 'power3.inOut',
  })
}

const scrollToBottom = () => {
  const totalHeight = document.documentElement.scrollHeight

  gsap.to(window, {
    duration: 5,
    scrollTo: totalHeight,
    ease: 'power2.inOut',
  })
}

const goToContact = () => {
  router.go('/posts/')
}
</script>

<template>
  <div class="floating-dock fixed bottom-0 left-0 p-4 flex align-items-center gap-3">
    <div class="nav-dock flex align-items-center p-2 border-round-3xl shadow-8">
      <button
        @click="scrollToTop"
        class="dock-btn p-link flex align-items-center justify-content-center border-circle transition-all"
        v-tooltip.top="t('actions.top')"
      >
        <i class="pi pi-arrow-up text-cyan-400"></i>
      </button>

      <div class="dock-divider mx-2"></div>

      <button
        @click="scrollToBottom"
        class="dock-btn p-link flex align-items-center justify-content-center border-circle transition-all"
        v-tooltip.top="t('actions.bottom')"
      >
        <i class="pi pi-arrow-down text-pink-400"></i>
      </button>

      <div class="dock-divider mx-2"></div>

      <button
        @click="goToContact"
        class="dock-btn p-link flex align-items-center justify-content-center border-circle transition-all"
        v-tooltip.top="t('actions.blog')"
      >
        <i class="pi pi-book text-emerald-400"></i>
      </button>
    </div>

    <div class="music-player-wrapper"></div>
  </div>
</template>

<style scoped>
.floating-dock {
  z-index: 1000;
}

.nav-dock {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dock-btn {
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

/* Efeito de hover no fundo do botão */
.dock-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Efeito Neon nos ícones */
.dock-btn i {
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.dock-btn:hover i {
  transform: scale(1.15) translateY(-2px);
  filter: drop-shadow(0 0 8px currentColor);
}

/* Linha separadora entre os botões */
.dock-divider {
  width: 1px;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
}
</style>
