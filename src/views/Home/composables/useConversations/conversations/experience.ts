import { getCurrentTime } from '../../../utils/date'
import { SenderParams, ConversationPayload } from '../../../utils/types'
import { TextContent } from './Base/Content'
import { BaseMessage, UserMessage } from './Base/Message'

export const createExperienceFlow = ({ botSender }: SenderParams): BaseMessage[] => [
  new UserMessage(
    8,
    'received',
    new TextContent(
      'Minha carreira tem sido focada em criar SPAs (Single Page Applications) para empresas de tecnologia e agências digitais.'
    ),
    botSender,
    getCurrentTime()
  ),
  new UserMessage(
    9,
    'received',
    new TextContent(
      'Atualmente, trabalho na Zenvia, onde lidero o desenvolvimento do front-end do núcleo do produto aonde há um ecossistema lidando com Envio de Mensagens, Automação desses envio de mensagens, além da caixa de atendimento e gerenciamento de grupos/multigrupos, utilizando Vue 3, Pinia e TypeScript.'
    ),
    botSender,
    getCurrentTime()
  ),
  new UserMessage(
    10,
    'received',
    new TextContent(
      'Posso te contar mais sobre algum projeto específico ou podemos seguir para outro tópico.',
      [
        { text: 'Ver posts de tecnologias', payload: ConversationPayload.POSTS },
        { text: 'Entrar em contato', payload: ConversationPayload.CONTACT },
      ]
    ),
    botSender,
    getCurrentTime()
  ),
]
