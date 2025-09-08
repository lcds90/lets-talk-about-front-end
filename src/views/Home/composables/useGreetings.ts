import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGreetings = defineStore('greeting', () => {
  const hoverMessage = ref('')
  const getGreeting = computed(() => {
    const d = new Date()
    const hour = d.getHours()

    let time = '🌆'
    if (hour < 12 && hour >= 6) time = '⛅'
    if (hour > 12 && hour < 18) time = '🌄'
    if (hour > 18 && hour < 24) time = '🌃'

    return `Desenvolvedor senior front-end ${time}`
  })

  return {
    hoverMessage,
    getGreeting,
  }
})
