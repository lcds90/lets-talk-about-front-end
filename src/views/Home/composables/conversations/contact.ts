import { getCurrentTime } from '../../utils/date'
import { SenderParams } from '../../utils/types'
import { TextContent } from './Base/Content'
import { BaseMessage, UserMessage } from './Base/Message'

export const createContactFlow = ({ botSender }: SenderParams): BaseMessage[] => [
  new UserMessage(
    11,
    'received',
    new TextContent(
      'Será um prazer nos conectarmos! Você pode me encontrar nas seguintes redes ou me enviar um e-mail.'
    ),
    botSender,
    getCurrentTime()
  ),
  new UserMessage(
    12,
    'received',
    new TextContent('Qual prefere?', [
      { text: 'LinkedIn', payload: 'https://www.linkedin.com/in/exemplo-leonardo' },
      { text: 'GitHub', payload: 'https://github.com/exemplo-leonardo' },
      { text: 'E-mail', payload: 'mailto:leonardo.dev@email.com' },
    ]),
    botSender,
    getCurrentTime()
  ),
]
