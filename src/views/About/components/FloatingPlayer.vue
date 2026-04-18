<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { gsap } from 'gsap'
import { useMusicStore } from '../stores/useMusicStore'

const musicStore = useMusicStore()

const playerRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)
const bubbleRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

let pulseAnim: gsap.core.Tween | null = null
let particlesAnim: gsap.core.Tween | null = null

// Ligação bidirecional precisa com o Pinia
const volumeValue = computed({
  get: () => musicStore.volume,
  set: (val) => musicStore.setVolume(Number(val)),
})

onMounted(() => {
  musicStore.initAudio()

  gsap.from(playerRef.value, {
    y: 100,
    opacity: 0,
    scale: 0.5,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)',
    delay: 1.5,
  })
})

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
    pulseAnim = gsap.to(btnRef.value, {
      scale: 1.1,
      rotation: 5,
      yoyo: true,
      repeat: -1,
      duration: 0.45,
      ease: 'sine.inOut',
    })

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

    gsap.to(bubbleRef.value, {
      scale: 1,
      opacity: 1,
      y: -10,
      duration: 0.6,
      ease: 'back.out(1.5)',
    })

    if (videoRef.value) {
      videoRef.value.play().catch((e) => console.error('Erro ao tocar vídeo:', e))
    }
  }, playerRef.value ?? undefined)
}

const stopAnimations = () => {
  if (pulseAnim) pulseAnim.kill()
  if (particlesAnim) particlesAnim.kill()

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

  gsap.to(bubbleRef.value, {
    scale: 0,
    opacity: 0,
    y: 0,
    duration: 0.4,
    ease: 'back.in(1.5)',
    onComplete: () => {
      if (videoRef.value) videoRef.value.pause()
    },
  })
}

const handleNextTrack = () => {
  musicStore.nextTrack()
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
    <div ref="bubbleRef" class="thought-bubble-wrapper absolute z-0 pointer-events-none">
      <div class="video-container shadow-6 border-2">
        <video
          ref="videoRef"
          src="/gatos-musica.mp4"
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        ></video>
      </div>
      <div class="bubble-dot dot-1 border-2"></div>
      <div class="bubble-dot dot-2 border-2"></div>
    </div>

    <div class="particles-container absolute w-full h-full pointer-events-none z-1">
      <span class="music-particle absolute opacity-0 text-xl" style="color: var(--primary-color)"
        >🎵</span
      >
      <span class="music-particle absolute opacity-0 text-2xl text-white">🎶</span>
      <span class="music-particle absolute opacity-0 text-xl" style="color: var(--primary-color)"
        >🎵</span
      >
      <span class="music-particle absolute opacity-0 text-xl text-white">✨</span>
    </div>

    <div class="relative flex align-items-center gap-3 z-2">
      <div
        class="volume-wrapper flex align-items-center gap-2 glass-btn px-3 py-2 border-round-3xl border-1 border-white-alpha-20 shadow-3"
      >
        <i
          class="pi text-white text-sm"
          :class="
            musicStore.volume === 0
              ? 'pi-volume-off'
              : musicStore.volume < 0.5
                ? 'pi-volume-down'
                : 'pi-volume-up'
          "
        >
        </i>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model="volumeValue"
          class="volume-slider"
          title="Ajustar Volume"
        />
      </div>

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
        class="next-btn flex align-items-center justify-content-center border-circle cursor-pointer transition-transform hover:-translate-y-1 outline-none border-none glass-btn text-white shadow-3 border-1 border-white-alpha-20"
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
  /* No telemóvel, o slider de volume pode ser ligeiramente mais curto para caber bem */
  .volume-slider {
    width: 60px !important;
  }
}

/* === CONTROLE DE VOLUME PRECISO (CSS CUSTOMIZADO) === */
.volume-wrapper {
  transition: all 0.3s ease;
}

.volume-slider {
  -webkit-appearance: none;
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}

/* Bolinha do Slider (ganha a cor do tema atual da música!) */
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 10px var(--primary-color);
  transition: transform 0.2s ease;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.3);
}
/* ==================================================== */

.thought-bubble-wrapper {
  bottom: 110%;
  right: 60px; /* Ajustado para ficar por cima do botão de play */
  transform-origin: bottom right;
  transform: scale(0);
  opacity: 0;
}

.video-container {
  width: 140px;
  background: rgba(15, 23, 42, 0.8);
  border-radius: 50px;
  overflow: hidden;
  border-color: var(--primary-color);
  transition: border-color 0.5s ease;
}

.bubble-dot {
  position: absolute;
  background: rgba(30, 41, 59, 0.9);
  border-radius: 50%;
  border-color: var(--primary-color);
  transition: border-color 0.5s ease;
}

.dot-1 {
  width: 16px;
  height: 16px;
  bottom: -15px;
  right: 35px;
}

.dot-2 {
  width: 8px;
  height: 8px;
  bottom: -28px;
  right: 25px;
}

.player-btn {
  width: 4.5rem;
  height: 4.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: white;
}

.next-btn {
  width: 2.5rem;
  height: 2.5rem;
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(12px);
}
.glass-btn:hover {
  background: rgba(30, 41, 59, 0.9);
}

.is-playing {
  background-color: var(--primary-color);
  box-shadow:
    0 0 20px var(--primary-color),
    0 0 40px rgba(27, 27, 27, 0.3);
}

.particles-container {
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
