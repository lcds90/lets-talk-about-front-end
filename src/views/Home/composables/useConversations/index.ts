import { computed, ref } from 'vue'
import { ConversationPayload, Message, Sender, SenderParams } from '../../utils/types/Message'
import { defineStore, storeToRefs } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { useGravatarProfile } from '../useGravatarProfile'
import { getCurrentTime } from '../../utils/date'
import {
  BaseMessage,
  createPostsFlow,
  createExperienceFlow,
  createContactFlow,
  ConversationManager,
  createInitialFlow,
  createPostsVueFlow,
} from './conversations'

export const useConversations = defineStore('conversations', () => {
  const newMessage = ref('')
  const stillTyping = ref<'user' | 'chatbot' | null>(null)
  const { profile } = storeToRefs(useGravatarProfile())
  const userSender = computed<Sender>(() => ({ name: 'User' }))
  const botSender = computed<Sender>(() => ({ name: 'Leonardo', avatar: profile.value.img }))

  const conversationFlows = new Map<string, (params: SenderParams) => BaseMessage[]>([
    [ConversationPayload.POSTS, createPostsFlow],
    [ConversationPayload.EXPERIENCE, createExperienceFlow],
    [ConversationPayload.CONTACT, createContactFlow],
    [ConversationPayload.POSTS_VUE, createPostsVueFlow],
  ])
  const chat = new ConversationManager(
    conversationFlows,
    createInitialFlow,
    botSender.value,
    userSender.value
  )

  const messages = ref(
    useLocalStorage(
      'lcds/conversations',
      createInitialFlow({ botSender: botSender.value, userSender: userSender.value })
    )
  )
  const hasMessagesInHistory = computed(() => messages.value.length !== 4)

  const addMessageWithAnimation = (flowMessages: Message[]) => {
    return new Promise((resolve) => {
      if (!flowMessages || flowMessages.length === 0) {
        resolve(true)
        return
      }

      stillTyping.value = 'chatbot'

      flowMessages.forEach((message, index) => {
        setTimeout(() => {
          messages.value.push(message)
        }, 2000 * index)
      })

      const totalAnimationTime = 2000 * (flowMessages.length - 1)

      setTimeout(() => {
        resolve(true)
      }, totalAnimationTime + 50) // Adicionamos 50ms de margem
    })
  }

  const handleButtonClick = async (buttonPayload: ConversationPayload) => {
    const userMessage: Message = {
      id: Date.now(),
      type: 'message',
      direction: 'sent',
      sender: { name: 'User' },
      content: {
        type: 'text',
        payload: `Quero saber sobre "${buttonPayload}"`,
      },
      time: new Date().toISOString(),
    }
    messages.value.push(userMessage)

    const nextFlow = chat.triggerFlowByPayload(buttonPayload)

    if (nextFlow.length) {
      await addMessageWithAnimation(nextFlow)
      stillTyping.value = null
    }
  }

  const resetMessages = () => {
    messages.value = createInitialFlow({
      botSender: botSender.value,
      userSender: userSender.value,
    })
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
