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
      {
        text: 'Ver posts sobre Vue.js',
        payload: ConversationPayload.POSTS_VUE,
      },
      { text: 'Ver posts sobre GSAP', payload: ConversationPayload.POSTS_GSAP },
      { text: 'Ver posts sobre TypeScript', payload: ConversationPayload.POSTS_TYPESCRIPT },
      { text: 'Experiência profissional', payload: ConversationPayload.EXPERIENCE },
      { text: 'Entrar em contato', payload: ConversationPayload.CONTACT },
    ]),
    botSender,
    getCurrentTime()
  ),
]

export const createPostsVueFlow = ({ botSender }: SenderParams): BaseMessage[] => [
  new UserMessage(
    13,
    'received',
    new TextContent('Aqui estão alguns dos meus posts sobre Vue.js:\n\n', [
      {
        text: 'Listagem de posts sobre Vue.js',
        payload: 'Postagem de vue',
        onClick: () => {
          const a = document.createElement('a')
          a.href = '/posts/vue'
          if (!window) return
          // Cria um evento de clique simulando a tecla CTRL pressionada
          const evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            ctrlKey: true, // Tenta forçar o comportamento de aba em segundo plano
          })

          console.log('Simulating click with CTRL key to open in new tab')

          a.dispatchEvent(evt)
        },
      },
      {
        text: 'Ciclo de vida dos componentes Vue',
        payload: 'Postagem de lifecycle vue',
        onClick: () => window ? window.open('/posts/vue/lifecycle') : null,
      },
    ]),
    botSender,
    getCurrentTime()
  ),
]
