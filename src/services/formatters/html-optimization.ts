import type { Options } from 'html-minifier-terser'
import { logError } from '@lib/pino/helpers/log-error'
import { EMAIL_MINIFY_ERROR, WEB_MINIFY_ERROR } from '@messages/loggings/services/html-optimization'
import { minify } from 'html-minifier-terser'

const emailMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  keepClosingSlash: true,
  removeEmptyAttributes: true,
  ignoreCustomComments: [/^!/],
} as const satisfies Options

const webMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
} as const satisfies Options

/**
 * Serviço de otimização e minificação de HTML com dois perfis distintos.
 *
 * - **Web:** minificação agressiva (remove atributos redundantes, minifica JS/CSS, encurta doctype).
 * - **E-mail:** minificação conservadora (preserva closing slashes e atributos necessários
 *   para compatibilidade com clientes de e-mail).
 *
 * Ambos os perfis removem artefatos DOM residuais (e.g., `xmlns` do XHTML).
 * Em caso de falha na minificação, retorna o HTML original sem modificações.
 */
export class HtmlOptimizationService {
  /**
   * Remove artefatos DOM residuais do HTML (e.g., `xmlns` inserido por parsers XHTML).
   */
  private static cleanDomArtifacts(html: string): string {
    return html.replaceAll('xmlns="http://www.w3.org/1999/xhtml"', '')
  }

  /**
   * Minifica HTML para envio por e-mail.
   *
   * Preserva closing slashes e atributos necessários para compatibilidade
   * com clientes de e-mail (Outlook, Gmail, etc.).
   *
   * @param html - HTML a ser minificado.
   * @returns HTML minificado, ou o original em caso de erro.
   */
  static async minifyForEmail(html: string): Promise<string> {
    try {
      const cleanedHtml = HtmlOptimizationService.cleanDomArtifacts(html)
      return await minify(cleanedHtml, emailMinifyOptions)
    } catch (error) {
      logError({ error: error, message: EMAIL_MINIFY_ERROR })
      return html
    }
  }

  /**
   * Minifica HTML para exibição web.
   *
   * Aplica otimizações agressivas: remoção de atributos redundantes,
   * minificação de JS/CSS inline, encurtamento de doctype, etc.
   *
   * @param html - HTML a ser minificado.
   * @returns HTML minificado, ou o original em caso de erro.
   */
  static async minifyForWeb(html: string): Promise<string> {
    try {
      const cleanedHtml = HtmlOptimizationService.cleanDomArtifacts(html)
      return await minify(cleanedHtml, webMinifyOptions)
    } catch (error) {
      logError({ error: error, message: WEB_MINIFY_ERROR })
      return html
    }
  }
}
