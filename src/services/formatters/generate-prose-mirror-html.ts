import type { Extensions, JSONContent } from '@tiptap/core'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { generateHTML } from '@tiptap/html'

/**
 * Converte conteúdo ProseMirror (JSON) para HTML otimizado para exibição web.
 *
 * Aplica minificação agressiva (remoção de atributos redundantes, minificação JS/CSS).
 *
 * @param content - Conteúdo ProseMirror no formato `JSONContent`.
 * @param extensions - Extensões TipTap para interpretação do conteúdo.
 * @returns HTML minificado para web.
 */
export async function generateProseMirrorHtmlWeb(content: JSONContent, extensions: Extensions): Promise<string> {
  const html = generateHTML(content, extensions)

  return HtmlOptimizationService.minifyForWeb(html)
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
export async function generateProseMirrorHtmlEmail(content: JSONContent, extensions: Extensions): Promise<string> {
  const html = generateHTML(content, extensions)

  return HtmlOptimizationService.minifyForEmail(html)
}
