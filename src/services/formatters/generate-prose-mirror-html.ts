import type { Extensions, JSONContent } from '@tiptap/core'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { generateHTML } from '@tiptap/html'
import { injectable } from 'tsyringe'
import { HtmlSanitizationService } from './html-sanitization-service'

@injectable()
export class TipTapRendererService {
  /**
   * Converte conteúdo ProseMirror (JSON) para HTML otimizado para exibição web.
   *
   * Aplica minificação agressiva (remoção de atributos redundantes, minificação JS/CSS).
   *
   * @param content - Conteúdo ProseMirror no formato `JSONContent`.
   * @param extensions - Extensões TipTap para interpretação do conteúdo.
   * @returns HTML minificado para web.
   */
  generateProseMirrorHtmlWeb(content: JSONContent, extensions: Extensions): Promise<string> {
    const rawHtml = generateHTML(content, extensions)

    const safeHtml = HtmlSanitizationService.sanitizeForWeb(rawHtml)

    return HtmlOptimizationService.minifyForWeb(safeHtml)
  }

  /**
   * Converte conteúdo ProseMirror (JSON) para HTML otimizado para envio por e-mail.
   *
   * Aplica minificação conservadora (preserva closing slashes para compatibilidade
   * com clientes de e-mail).
   *
   * @param content - Conteúdo ProseMirror no formato `JSONContent`.
   * @param extensions - Extensões TipTap para interpretação do conteúdo.
   * @returns HTML minificado para e-mail.
   */
  generateProseMirrorHtmlEmail(content: JSONContent, extensions: Extensions): Promise<string> {
    const rawHtml = generateHTML(content, extensions)

    const safeHtml = HtmlSanitizationService.sanitizeForEmail(rawHtml)

    return HtmlOptimizationService.minifyForEmail(safeHtml)
  }
}
