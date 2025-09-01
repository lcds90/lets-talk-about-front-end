import { computed } from 'vue'

export const useGreetings = () => {
  const getGreeting = computed(() => {
    type Times = 'default' | 'morning' | 'afternoon' | 'night'
    const messages: Record<Times, string> = {
      afternoon: 'Boa tarde',
      morning: 'Bom dia',
      night: 'Boa noite',
      default: 'Seja bem vindo',
    }

    const d = new Date()
    const hour = d.getHours()

    let time: Times = 'default'
    if (hour < 12 && hour >= 6) time = 'morning'
    if (hour > 12 && hour < 18) time = 'afternoon'
    if (hour > 18 && hour < 24) time = 'night'

    return messages[time]
  })

  return {
    getGreeting,
  }
}
