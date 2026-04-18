import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useMusicStore = defineStore('music', () => {
  const playlist = [
    {
      id: 1,
      url: 'https://cdn1.suno.ai/6f2f2f3d-70cf-4111-99a1-dedf0d48b07a.m4a',
      color: '#6366f1',
    },
    {
      id: 2,
      url: 'https://cdn1.suno.ai/c10e4941-75e2-499c-af3c-4b24e13fd244.m4a',
      color: '#ec4899',
    },
    {
      id: 3,
      url: 'https://cdn1.suno.ai/b098ecf0-2c34-4aaa-9920-aaf705ce75d1.m4a',
      color: '#10b981',
    },
  ]

  const currentTrackIndex = ref(0)
  const isPlaying = ref(false)
  const volume = ref(0.15) // INICIA BEM BAIXO (15%)

  const audio = shallowRef<HTMLAudioElement | null>(null)

  const initAudio = () => {
    if (audio.value) return

    currentTrackIndex.value = Math.floor(Math.random() * playlist.length)
    const track = playlist[currentTrackIndex.value]

    audio.value = new Audio(track.url)
    // Aplica o volume inicial ao objeto de áudio
    audio.value.volume = volume.value
    audio.value.addEventListener('ended', nextTrack)

    applyThemeColor(track.color)
  }

  const togglePlay = () => {
    if (!audio.value) initAudio()

    if (isPlaying.value) {
      audio.value?.pause()
      isPlaying.value = false
    } else {
      audio.value?.play().catch((e) => console.error('Auto-play bloqueado:', e))
      isPlaying.value = true
    }
  }

  const nextTrack = () => {
    if (!audio.value) return

    currentTrackIndex.value = (currentTrackIndex.value + 1) % playlist.length
    const track = playlist[currentTrackIndex.value]

    audio.value.src = track.url
    audio.value.load()
    // Garante que a nova música herda o volume atual
    audio.value.volume = volume.value

    if (isPlaying.value) {
      audio.value.play().catch((e) => console.error(e))
    }

    applyThemeColor(track.color)
  }

  // NOVA FUNÇÃO: Atualiza o volume com precisão
  const setVolume = (newVolume: number) => {
    volume.value = newVolume
    if (audio.value) {
      audio.value.volume = newVolume
    }
  }

  const applyThemeColor = (hexColor: string) => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', hexColor)
    root.style.setProperty('--p-primary-color', hexColor)
    root.style.setProperty('--vp-c-brand-1', hexColor)
    root.style.setProperty('--vp-c-brand-2', hexColor)
  }

  return {
    isPlaying,
    volume,
    initAudio,
    togglePlay,
    nextTrack,
    setVolume,
  }
})
