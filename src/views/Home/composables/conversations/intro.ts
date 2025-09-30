import { getCurrentTime } from '../../utils/date'
import { ConversationPayload, SenderParams } from '../../utils/types'
import { TextContent } from './Base/Content'
import { BaseMessage, DateMessage, SystemMessage, UserMessage } from './Base/Message'

export const createInitialFlow = ({ botSender, userSender }: SenderParams): BaseMessage[] => [
  new DateMessage(1, getCurrentTime()),
  new SystemMessage(2, 'Você iniciou uma conversa com o Assistente de Portfólio ✨'),
  new UserMessage(
    3,
    'sent',
    new TextContent('Olá, me fale mais sobre o Leonardo!'),
    userSender,
    getCurrentTime()
  ),
  new UserMessage(
    4,
    'received',
    new TextContent(
      'Olá! Sou o Leonardo, desenvolvedor front-end com 5+ anos de experiência. Tenho paixão por criar interfaces interativas e acessíveis. O que você gostaria de saber primeiro?',
      [
        { text: 'Ver posts de tecnologias', payload: ConversationPayload.POSTS },
        { text: 'Experiência profissional', payload: ConversationPayload.EXPERIENCE },
        { text: 'Contato', payload: ConversationPayload.CONTACT },
      ]
    ),
    botSender,
    getCurrentTime()
  ),
]
