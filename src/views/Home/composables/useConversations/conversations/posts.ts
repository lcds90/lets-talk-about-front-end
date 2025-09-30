import { getCurrentTime } from '../../../utils/date'
import { SenderParams, ConversationPayload } from '../../../utils/types'
import { TextContent, ImageContent } from './Base/Content'
import { BaseMessage, UserMessage } from './Base/Message'

export const createPostsFlow = ({ botSender }: SenderParams): BaseMessage[] => [
  new UserMessage(
    5,
    'received',
    new TextContent(
      'Legal! Gosto de escrever sobre as tecnologias que uso no dia a dia. Meus tópicos favoritos recentes são Vue.js, GSAP para animações e TypeScript.'
    ),
    botSender,
    getCurrentTime()
  ),
  new UserMessage(
    6,
    'received',
    new ImageContent('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070'),
    botSender,
    getCurrentTime()
  ),
  new UserMessage(
    7,
    'received',
    new TextContent('O que mais te interessa?', [
      { text: 'Ver posts sobre Vue.js', payload: ConversationPayload.POSTS_VUE },
      { text: 'Ver posts sobre GSAP', payload: ConversationPayload.POSTS_GSAP },
      { text: 'Ver posts sobre TypeScript', payload: ConversationPayload.POSTS_TYPESCRIPT },
      { text: 'Experiência profissional', payload: ConversationPayload.EXPERIENCE },
      { text: 'Entrar em contato', payload: ConversationPayload.CONTACT },
    ]),
    botSender,
    getCurrentTime()
  ),
]
