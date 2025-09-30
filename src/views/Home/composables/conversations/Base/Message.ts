import { Sender } from '../../../utils/types'
import { Content, TextContent } from './Content'

/**
 * 📦 Classe base abstrata para todas as mensagens do chat. \
 * Define a estrutura e as propriedades comuns que toda mensagem deve ter.
 * Não deve ser instanciada diretamente.
 */
export abstract class BaseMessage {
  /** O identificador único da mensagem. */
  public readonly id: number
  /** O tipo da mensagem, que define sua categoria (sistema, data ou diálogo). */
  public readonly type: 'system' | 'date' | 'message'
  /** A direção da mensagem (enviada, recebida ou do sistema). */
  public readonly direction: 'sent' | 'received' | 'system'
  /** O objeto de conteúdo da mensagem (texto, imagem, etc.). */
  public readonly content: Content
  /** O horário em que a mensagem foi enviada/registrada, opcional para mensagens de sistema. */
  public readonly time?: string

  /**
   * @param id O ID único da mensagem.
   * @param type A categoria da mensagem.
   * @param direction A direção da mensagem.
   * @param content O conteúdo da mensagem.
   * @param time O horário da mensagem.
   */
  protected constructor(
    id: number,
    type: 'system' | 'date' | 'message',
    direction: 'sent' | 'received' | 'system',
    content: Content,
    time?: string
  ) {
    this.id = id
    this.type = type
    this.direction = direction
    this.content = content
    this.time = time
  }
}

/**
 * 📅 Representa um marcador de data/hora na conversa. \
 * É uma mensagem gerada pelo sistema para separar diálogos por tempo.
 */
export class DateMessage extends BaseMessage {
  /**
   * @param id O ID único da mensagem.
   * @param time A string de data/hora a ser exibida.
   */
  constructor(id: number, time: string) {
    super(id, 'date', 'system', new TextContent(time), time)
  }
}

/**
 * ⚙️ Representa uma mensagem informativa gerada pelo sistema. \
 * Exemplo: "Você iniciou a conversa".
 */
export class SystemMessage extends BaseMessage {
  /**
   * @param id O ID único da mensagem.
   * @param text O texto da notificação do sistema.
   */
  constructor(id: number, text: string) {
    super(id, 'system', 'system', new TextContent(text))
  }
}

/**
 * 💬 Representa uma mensagem de diálogo padrão, enviada por um usuário ou pelo bot. \
 * Contém informações sobre o remetente e pode ter diversos tipos de conteúdo.
 */
export class UserMessage extends BaseMessage {
  /** O objeto que identifica quem enviou a mensagem. */
  public readonly sender: Sender

  /**
   * @param id O ID único da mensagem.
   * @param direction A direção ('sent' para o usuário, 'received' para o bot).
   * @param content O conteúdo da mensagem (pode ser TextContent, ImageContent, etc.).
   * @param sender O objeto com os dados de quem enviou.
   * @param time O horário em que a mensagem foi enviada.
   */
  constructor(
    id: number,
    direction: 'sent' | 'received',
    content: Content,
    sender: Sender,
    time: string
  ) {
    super(id, 'message', direction, content, time)
    this.sender = sender
  }
}
