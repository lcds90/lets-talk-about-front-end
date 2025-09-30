import { Button } from 'src/views/Home/utils/types'

/**
 * 📝 Classe base abstrata para todos os tipos de conteúdo de uma mensagem.
 * Não deve ser instanciada diretamente.
 */
export abstract class Content {
  /** O tipo de conteúdo, como 'text' ou 'image'. */
  public readonly type: 'text' | 'image'
  /** A carga útil do conteúdo (o texto ou a URL da imagem). */
  public payload: string

  /**
   * @param type O tipo de conteúdo.
   * @param payload A carga útil do conteúdo.
   */
  protected constructor(type: 'text' | 'image', payload: string) {
    this.type = type
    this.payload = payload
  }
}

/**
 * 💬 Representa um conteúdo de mensagem do tipo texto. \
 * Pode, opcionalmente, conter botões de ação rápida.
 */
export class TextContent extends Content {
  /** Um array opcional de botões interativos. */
  public buttons?: Button[]

  /**
   * @param payload O texto principal da mensagem.
   * @param buttons Um array opcional de botões a serem exibidos com o texto.
   */
  constructor(payload: string, buttons?: Button[]) {
    super('text', payload)
    this.buttons = buttons
  }
}

/**
 * 🖼️ Representa um conteúdo de mensagem do tipo imagem.
 */
export class ImageContent extends Content {
  /**
   * @param payload A URL completa da imagem a ser exibida.
   */
  constructor(payload: string) {
    // O payload aqui é a URL da imagem.
    super('image', payload)
  }
}
