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
