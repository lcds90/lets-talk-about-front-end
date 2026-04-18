import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useMusicStore = defineStore('music', () => {
  // A sua playlist com as URLs do Suno e as cores de tema associadas a cada vibe
  const playlist = [
    {
      id: 1,
      url: 'https://cdn1.suno.ai/6f2f2f3d-70cf-4111-99a1-dedf0d48b07a.m4a',
      color: '#6366f1', // Indigo (Tech)
    },
    {
      id: 2,
      url: 'https://cdn1.suno.ai/c10e4941-75e2-499c-af3c-4b24e13fd244.m4a',
      color: '#ec4899', // Pink (Synthwave)
    },
    {
      id: 3,
      url: 'https://cdn1.suno.ai/b098ecf0-2c34-4aaa-9920-aaf705ce75d1.m4a',
      color: '#10b981', // Emerald (Lofi/Chill)
    },
  ]

  const currentTrackIndex = ref(0)
  const isPlaying = ref(false)

  // Usamos shallowRef para o objeto Audio para evitar overhead de reatividade profunda do Vue
  const audio = shallowRef<HTMLAudioElement | null>(null)

  // 1. Inicializa o player (chamado no onMounted do componente)
  const initAudio = () => {
    if (audio.value) return // Evita múltiplas instâncias

    // Sorteia uma música aleatória ao entrar no site
    currentTrackIndex.value = Math.floor(Math.random() * playlist.length)
    const track = playlist[currentTrackIndex.value]

    audio.value = new Audio(track.url)
    audio.value.volume = 0.5 // Volume agradável

    // Quando a música acabar, toca a próxima automaticamente
    audio.value.addEventListener('ended', nextTrack)

    applyThemeColor(track.color)
  }

  // 2. Play / Pause
  const togglePlay = () => {
    if (!audio.value) initAudio()

    if (isPlaying.value) {
      audio.value?.pause()
      isPlaying.value = false
    } else {
      audio.value?.play().catch((e) => console.error('Auto-play bloqueado pelo navegador:', e))
      isPlaying.value = true
    }
  }

  // 3. Pular para a próxima música
  const nextTrack = () => {
    if (!audio.value) return

    // Avança o index (se chegar ao fim, volta à primeira)
    currentTrackIndex.value = (currentTrackIndex.value + 1) % playlist.length
    const track = playlist[currentTrackIndex.value]

    // Atualiza a source e recarrega
    audio.value.src = track.url
    audio.value.load()

    if (isPlaying.value) {
      audio.value.play().catch((e) => console.error(e))
    }

    // Muda a cor do site inteiro para a vibe da nova música!
    applyThemeColor(track.color)
  }

  // 4. Injetar a cor no CSS do site
  const applyThemeColor = (hexColor: string) => {
    const root = document.documentElement
    // Atualize as variáveis conforme o seu CSS/VitePress
    root.style.setProperty('--primary-color', hexColor)
    root.style.setProperty('--vp-c-brand-1', hexColor) // Se estiver a usar o default do VitePress
    root.style.setProperty('--vp-c-brand-2', hexColor)
  }

  return {
    isPlaying,
    initAudio,
    togglePlay,
    nextTrack,
  }
})
