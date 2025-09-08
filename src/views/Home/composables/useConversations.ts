import { computed, ref } from 'vue'
import { Message } from '../types/Message'
import { defineStore, storeToRefs } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useGravatarProfile } from './useGravatarProfile'

export enum ConversationPayload {
  INITIAL = 'initial',
  POSTS = 'posts',
  EXPERIENCE = 'experience',
  CONTACT = 'contact',
}

const getCurrentTime = () => {
  return new Date().toISOString()
}

export const useConversations = defineStore('conversations', () => {
  const newMessage = ref('')
  const stillTyping = ref<'user' | 'chatbot' | null>(null)
  const { profile } = storeToRefs(useGravatarProfile())

  const initialConversation: Message[] = [
    {
      id: 1,
      type: 'date',
      direction: 'system',
      content: {
        payload: getCurrentTime(),
        type: 'text',
      },
    },
    {
      id: 2,
      type: 'system',
      direction: 'system',
      content: {
        type: 'text',
        payload: 'Você iniciou uma conversa com o Assistente de Portfólio ✨',
      },
    },
    {
      id: 3,
      type: 'message',
      direction: 'sent',
      sender: {
        name: 'User',
      },
      content: {
        type: 'text',
        payload: 'Olá, me fale mais sobre o Leonardo!',
      },
      time: getCurrentTime(),
    },
    {
      id: 4,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Olá! Sou o Leonardo, desenvolvedor front-end com 5+ anos de experiência. Tenho paixão por criar interfaces interativas e acessíveis. O que você gostaria de saber primeiro?',
        buttons: [
          {
            text: 'Ver posts de tecnologias',
            payload: ConversationPayload.POSTS,
          },
          {
            text: 'Experiência profissional',
            payload: ConversationPayload.EXPERIENCE,
          },
          {
            text: 'Contato',
            payload: ConversationPayload.CONTACT,
          },
        ],
      },
      time: getCurrentTime(),
    },
  ]

  const postsFlow: Message[] = [
    {
      id: 5,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Legal! Gosto de escrever sobre as tecnologias que uso no dia a dia. Meus tópicos favoritos recentes são Vue.js, GSAP para animações e TypeScript.',
      },
      time: getCurrentTime(),
    },
    {
      id: 6,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'image',
        // Imagem de exemplo sobre tecnologia
        payload: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070',
      },
      time: getCurrentTime(),
    },
    {
      id: 7,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload: 'O que mais te interessa?',
        buttons: [
          {
            text: 'Experiência profissional',
            payload: 'experience',
          },
          {
            text: 'Entrar em contato',
            payload: 'contact',
          },
        ],
      },
      time: getCurrentTime(),
    },
  ]

  const experienceFlow: Message[] = [
    {
      id: 8,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Minha carreira tem sido focada em criar SPAs (Single Page Applications) para empresas de tecnologia e agências digitais.',
      },
      time: getCurrentTime(),
    },
    {
      id: 9,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Atualmente, trabalho na Zenvia, onde lidero o desenvolvimento do front-end do núcleo do produto aonde há um ecossistema lidando com Envio de Mensagens, Automação desses envio de mensagens, além da caixa de atendimento e gerenciamento de grupos/multigrupos, utilizando Vue 3, Pinia e TypeScript.',
      },
      time: getCurrentTime(),
    },
    {
      id: 10,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Posso te contar mais sobre algum projeto específico ou podemos seguir para outro tópico.',
        buttons: [
          {
            text: 'Ver posts de tecnologias',
            payload: 'posts',
          },
          {
            text: 'Entrar em contato',
            payload: 'contact',
          },
        ],
      },
      time: getCurrentTime(),
    },
  ]

  const contactFlow: Message[] = [
    {
      id: 11,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload:
          'Será um prazer nos conectarmos! Você pode me encontrar nas seguintes redes ou me enviar um e-mail.',
      },
      time: getCurrentTime(),
    },
    {
      id: 12,
      type: 'message',
      direction: 'received',
      sender: {
        name: 'Leonardo',
        avatar: profile.value.img,
      },
      content: {
        type: 'text',
        payload: 'Qual prefere?',
        buttons: [
          {
            text: 'LinkedIn',
            // O payload aqui poderia ser a URL direta para o seu componente tratar como um link
            payload: 'https://www.linkedin.com/in/exemplo-leonardo',
          },
          {
            text: 'GitHub',
            payload: 'https://github.com/exemplo-leonardo',
          },
          {
            text: 'E-mail',
            payload: 'mailto:leonardo.dev@email.com',
          },
        ],
      },
      time: getCurrentTime(),
    },
  ]

  const conversationFlows: Record<ConversationPayload, Message[]> = {
    [ConversationPayload.INITIAL]: initialConversation,
    [ConversationPayload.POSTS]: postsFlow,
    [ConversationPayload.EXPERIENCE]: experienceFlow,
    [ConversationPayload.CONTACT]: contactFlow,
  }
  const messages = ref(useLocalStorage('lcds/conversations', [...initialConversation]))
  const hasMessagesInHistory = computed(() => messages.value.length !== initialConversation.length)

  const addMessageWithAnimation = (flowMessages: Message[]) => {
    return new Promise((resolve) => {
      // Se não houver mensagens para adicionar, resolve imediatamente.
      if (!flowMessages || flowMessages.length === 0) {
        resolve(true)
        return
      }

      // Inicia o indicador de digitação AQUI, antes do loop
      stillTyping.value = 'chatbot'

      // O loop para agendar a exibição de cada mensagem continua o mesmo.
      flowMessages.forEach((message, index) => {
        setTimeout(() => {
          messages.value.push(message)
        }, 2000 * index) // O +1 não é estritamente necessário
      })

      // CÁLCULO FINAL: O segredo está aqui.
      // Calculamos o tempo total que levará para a última mensagem aparecer.
      const totalAnimationTime = 2000 * (flowMessages.length - 1)

      // Criamos um último setTimeout que irá resolver a Promise
      // somente DEPOIS que a última animação tiver ocorrido.
      setTimeout(() => {
        resolve(true)
      }, totalAnimationTime + 50) // Adicionamos 50ms de margem
    })
  }

  const handleButtonClick = async (buttonPayload: ConversationPayload) => {
    const userMessage: Message = {
      id: Date.now(), // ID dinâmico
      type: 'message',
      direction: 'sent',
      sender: { name: 'User' },
      content: {
        type: 'text',
        // O payload aqui poderia ser o texto do botão clicado, por exemplo
        payload: `Quero saber sobre "${buttonPayload}"`,
      },
      time: new Date().toISOString(),
    }
    messages.value.push(userMessage)

    const nextFlow = conversationFlows[buttonPayload]

    if (nextFlow) {
      await addMessageWithAnimation(nextFlow)
      stillTyping.value = null
    }
  }

  const resetMessages = () => {
    messages.value = [...initialConversation]
    newMessage.value = ''
  }

  const sendMessage = () => {
    console.log(newMessage.value)
  }

  const updateDate = () => {
    const newDate: Message = {
      id: messages.value.length + 1,
      type: 'date',
      direction: 'system',
      content: {
        payload: getCurrentTime(),
        type: 'text',
      },
    }

    const getLastDate = messages.value.findLast(({ type }) => type === 'date')
    if (getLastDate) {
      const {
        content: { payload: lastDateRegistered },
      } = getLastDate
      const newDateISO = newDate.content.payload.slice(0, 10)
      const lastDateISO = lastDateRegistered.slice(0, 10)
      const isSameDay = newDateISO === lastDateISO
      if (isSameDay) return
      messages.value.push(newDate)
    }
  }

  const parseDate = ({ date, style }: { date: string; style: 'date' | 'time' }) => {
    const styles: Record<'date' | 'time', Intl.DateTimeFormatOptions> = {
      date: {
        dateStyle: 'short',
      },
      time: {
        timeStyle: 'short',
      },
    }

    const { format } = Intl.DateTimeFormat('pt-BR', styles[style])
    return format(new Date(date))
  }

  return {
    conversationFlows,
    hasMessagesInHistory,
    messages,
    newMessage,
    stillTyping,
    handleButtonClick,
    parseDate,
    resetMessages,
    sendMessage,
    updateDate,
  }
})
