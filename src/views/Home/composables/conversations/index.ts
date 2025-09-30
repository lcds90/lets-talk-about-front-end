import { ref, Ref } from 'vue'

import { Sender, SenderParams } from '../../utils/types'
import { BaseMessage, UserMessage } from './Base/Message'
import { TextContent } from './Base/Content'

// Para facilitar, definimos um tipo para a coleção de fluxos.
// Usamos uma função "fábrica" para que os valores reativos sejam lidos no momento da execução.
type ConversationFlows = Map<string, (params: SenderParams) => BaseMessage[]>

/**
 * 🧠 Gerencia o estado e a lógica de uma conversa de chatbot.
 * Mantém a lista de mensagens e controla a adição de novos fluxos.
 */
export class ConversationManager {
  /** 💬 A lista reativa de mensagens da conversa. */
  public messages: Ref<BaseMessage[]>

  /** 🗺️ Um mapa com todos os fluxos de conversa pré-definidos. */
  private flows: ConversationFlows

  /** 🆔 O contador para o ID da próxima mensagem a ser adicionada. */
  private nextMessageId: number

  /**
   * Cria uma instância do gerenciador de conversas.
   * @param flows Um mapa onde a chave é o payload do fluxo e o valor é uma função que retorna um array de mensagens.
   * @param initialFlow Uma função que retorna o array de mensagens iniciais.
   */
  constructor(
    flows: ConversationFlows,
    initialFlow: (params: SenderParams) => BaseMessage[],
    private botSender: Sender,
    private userSender: Sender
  ) {
    this.messages = ref([])
    this.flows = flows
    this.nextMessageId = 1

    this.initialize(initialFlow)
  }

  /**
   * ✨ Inicia ou reinicia a conversa com o fluxo inicial.
   * @param initialFlow A função fábrica para o fluxo inicial.
   */
  private initialize(initialFlow: (params: SenderParams) => BaseMessage[]): void {
    const initialMessages = initialFlow({ botSender: this.botSender, userSender: this.userSender })
    this.messages.value = initialMessages
    // Garante que o próximo ID seja maior que qualquer ID inicial.
    this.updateNextId(initialMessages)
  }

  /**
   * ➡️ Dispara um fluxo de conversa com base em um payload.
   * @param payload O identificador do fluxo a ser iniciado (ex: 'posts').
   */
  public triggerFlowByPayload(payload: string): BaseMessage[] {
    const flowFactory = this.flows.get(payload)
    if (!flowFactory) {
      console.warn(`[ConversationManager] Fluxo com payload "${payload}" não encontrado.`)
      return []
    }

    // Executa a fábrica para obter as mensagens com os dados reativos mais recentes.
    const newMessages = flowFactory({ botSender: this.botSender, userSender: this.userSender })

    // Reatribui os IDs para garantir que sejam únicos na conversa atual.
    // newMessages.forEach((message) => {
    //   // Usamos Object.assign para criar uma nova instância com o ID atualizado.
    //   // Isso evita mutar o objeto original, que é uma boa prática.
    //   const updatedMessage = Object.assign(Object.create(Object.getPrototypeOf(message)), message, {
    //     id: this.nextMessageId++,
    //   })
    //   this.messages.value.push(updatedMessage)
    // })

    return newMessages
  }

  /**
   * 🙋‍♂️ Adiciona uma mensagem enviada pelo usuário à conversa.
   * @param text O conteúdo de texto da mensagem do usuário.
   * @param sender O objeto do remetente (usuário).
   */
  public sendUserMessage(text: string, sender: Sender): void {
    const userMessage = new UserMessage(
      this.nextMessageId++,
      'sent',
      new TextContent(text),
      sender,
      new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    )
    this.messages.value.push(userMessage)
  }

  /**
   * 🔄 Atualiza o contador de ID com base no ID mais alto de um array de mensagens.
   * @param messageList A lista de mensagens para verificar.
   */
  private updateNextId(messageList: BaseMessage[]): void {
    if (messageList.length === 0) return
    const maxId = Math.max(...messageList.map((m) => m.id))
    this.nextMessageId = maxId + 1
  }
}
