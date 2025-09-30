import { getCurrentTime } from '../../../utils/date'
import { SenderParams, ConversationPayload } from '../../../utils/types'
import { TextContent } from './Base/Content'
import { BaseMessage, DateMessage, SystemMessage, UserMessage } from './Base/Message'

import { i18nConversations } from '../i18n'

export const createInitialFlow = ({ botSender, userSender }: SenderParams): BaseMessage[] => [
  new DateMessage(1, getCurrentTime()),
  new SystemMessage(2, i18nConversations('intro.greeting')),
  new UserMessage(
    3,
    'sent',
    new TextContent(i18nConversations('intro.askName')),
    userSender,
    getCurrentTime()
  ),
  new UserMessage(
    4,
    'received',
    new TextContent(i18nConversations('intro.about'), [
      { text: i18nConversations('payload.posts'), payload: ConversationPayload.POSTS },
      { text: i18nConversations('payload.experience'), payload: ConversationPayload.EXPERIENCE },
      { text: i18nConversations('payload.contact'), payload: ConversationPayload.CONTACT },
    ]),
    botSender,
    getCurrentTime()
  ),
]
