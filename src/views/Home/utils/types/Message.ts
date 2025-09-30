export interface Message {
  id: number
  time?: string
  content: {
    payload: string
    buttons?: { text: string; payload: string }[]
    type: 'image' | 'text'
  }
  sender?: {
    name: string
    avatar?: string
  }
  type: 'system' | 'date' | 'message'
  direction: 'sent' | 'received' | 'system'
}

// Enum para os payloads de ações, continua útil.
export enum ConversationPayload {
  INITIAL = 'initial',
  POSTS = 'posts',
  EXPERIENCE = 'experience',
  CONTACT = 'contact',
}

// Interface para um botão, para manter o conteúdo de texto mais limpo.
export interface Button {
  text: string
  payload: string
}

// Interface para o remetente da mensagem.
export interface Sender {
  name: string
  avatar?: string
}

export interface SenderParams {
  botSender: Sender
  userSender: Sender
}
