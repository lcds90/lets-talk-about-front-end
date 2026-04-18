<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { useMusicStore } from '../stores/useMusicStore' // Ajuste o caminho da sua store

const musicStore = useMusicStore()

const playerRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)

let pulseAnim: gsap.core.Tween | null = null
let particlesAnim: gsap.core.Tween | null = null

onMounted(() => {
  // Inicializa a música aleatória na Store (mas não toca até o utilizador clicar)
  musicStore.initAudio()

  // Animação de entrada do player flutuante
  gsap.from(playerRef.value, {
    y: 100,
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)',
    delay: 1.5,
  })
})

// VIGIA A STORE: Se a música tocar ou parar (mesmo que por atalho de teclado), a UI reage
watch(
  () => musicStore.isPlaying,
  (isNowPlaying) => {
    if (isNowPlaying) {
      startAnimations()
    } else {
      stopAnimations()
    }
  }
)

const startAnimations = () => {
  gsap.context(() => {
    // 1. O botão principal pulsa com a batida
    pulseAnim = gsap.to(btnRef.value, {
      scale: 1.1,
      rotation: 5,
      yoyo: true,
      repeat: -1,
      duration: 0.45,
      ease: 'sine.inOut',
    })

    // 2. Chafariz de Notas Musicais
    const particles = gsap.utils.toArray('.music-particle') as HTMLElement[]
    gsap.set(particles, { y: 0, x: 0, opacity: 1, scale: 0.5, rotation: 0 })

    particlesAnim = gsap.to(particles, {
      y: () => gsap.utils.random(-100, -60),
      x: () => gsap.utils.random(-50, 50),
      opacity: 0,
      scale: () => gsap.utils.random(1, 2),
      rotation: () => gsap.utils.random(-45, 45),
      duration: () => gsap.utils.random(1.5, 2.5),
      ease: 'power1.out',
      stagger: {
        each: 0.3,
        repeat: -1,
      },
    })
  }, playerRef.value ?? undefined)
}

const stopAnimations = () => {
  if (pulseAnim) pulseAnim.kill()
  if (particlesAnim) particlesAnim.kill()

  // Retorna à posição original de descanso
  gsap.to(btnRef.value, {
    scale: 1,
    rotation: 0,
    duration: 0.5,
    ease: 'back.out(1.5)',
  })

  gsap.to('.music-particle', {
    opacity: 0,
    duration: 0.3,
  })
}

// Animação especial quando o utilizador clica em "Next Track"
const handleNextTrack = () => {
  musicStore.nextTrack()

  // Um pequeno "spin" para dar feedback visual que a música mudou
  gsap.fromTo(
    btnRef.value,
    { rotation: -180 },
    { rotation: 0, duration: 0.6, ease: 'back.out(1.5)' }
  )
}

onUnmounted(() => {
  stopAnimations()
})
</script>

<template>
  <div ref="playerRef" class="floating-player fixed z-5">
    <div class="particles-container absolute w-full h-full pointer-events-none">
      <span class="music-particle absolute opacity-0 text-xl" style="color: var(--primary-color)"
        >🎵</span
      >
      <span class="music-particle absolute opacity-0 text-2xl text-white">🎶</span>
      <span class="music-particle absolute opacity-0 text-xl" style="color: var(--primary-color)"
        >🎵</span
      >
      <span class="music-particle absolute opacity-0 text-xl text-white">✨</span>
    </div>

    <div class="relative flex align-items-center gap-2">
      <button
        ref="btnRef"
        @click="musicStore.togglePlay()"
        class="player-btn flex align-items-center justify-content-center border-circle cursor-pointer transition-colors outline-none border-none"
        :class="
          musicStore.isPlaying ? 'is-playing' : 'glass-btn text-300 border-1 border-white-alpha-20'
        "
        :title="musicStore.isPlaying ? 'Pausar Trilha' : 'Tocar Trilha Instrumental'"
      >
        <i class="pi text-3xl" :class="musicStore.isPlaying ? 'pi-pause' : 'pi-play'"></i>
      </button>

      <button
        @click="handleNextTrack"
        class="next-btn flex align-items-center justify-content-center border-circle cursor-pointer transition-transform hover:-translate-y-1 outline-none border-none glass-btn text-white shadow-3"
        title="Próxima Vibe"
      >
        <i class="pi pi-step-forward text-sm"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.floating-player {
  bottom: 2rem;
  right: 2rem;
}

@media (max-width: 768px) {
  .floating-player {
    bottom: 1.5rem;
    right: 1.5rem;
  }
}

/* O Botão Principal */
.player-btn {
  width: 4.5rem;
  height: 4.5rem;
  z-index: 10;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: white;
}

/* O Botão Satélite (Next) */
.next-btn {
  width: 2.5rem;
  height: 2.5rem;
  z-index: 9;
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(12px);
}
.glass-btn:hover {
  background: rgba(30, 41, 59, 0.9);
}

/* Estado Tocando (Usa a cor variável global que o Pinia alterou) */
.is-playing {
  background-color: var(--primary-color);
  box-shadow:
    0 0 20px var(--primary-color),
    0 0 40px var(--primary-color);
}

.particles-container {
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
