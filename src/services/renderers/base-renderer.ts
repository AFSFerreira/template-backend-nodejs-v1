import type { RenderOptions } from '@custom-types/services/renderers/base-renderer'
import type { RendererOutput } from '@custom-types/services/renderers/renderer-output'
import type { Attachment } from 'nodemailer/lib/mailer'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { UnreachableCaseError } from '@use-cases/errors/generic/unreachable-case-error'
import { TemplateEngine } from './template-engine'

/**
 * Classe abstrata base para renderização de templates de e-mail.
 *
 * Encapsula o fluxo completo de renderização: mapeamento de payload,
 * renderização Nunjucks (HTML e texto plano), minificação opcional e anexos.
 *
 * Subclasses devem definir:
 * - `htmlTemplatePath` e opcionalmente `textTemplatePath` (caminhos dos templates Nunjucks).
 * - `mapPayload(input)` para transformar dados de entrada no formato esperado pelo template.
 *
 * @typeParam TInput - Tipo dos dados de entrada para renderização.
 */
export abstract class BaseRenderer<TInput> {
  protected abstract htmlTemplatePath: string
  protected textTemplatePath: string | null = null

  protected abstract mapPayload(input: TInput): Record<string, unknown>

  protected getAttachments(): Attachment[] {
    return []
  }

  public async render(input: TInput, options?: RenderOptions): Promise<RendererOutput> {
    const payload = this.mapPayload(input)

    const htmlEngine = TemplateEngine.getHtmlInstance()

    let html = htmlEngine.render(this.htmlTemplatePath, payload)

    if (options) {
      if (options.minify) {
        const minifyOption = options.minify

        switch (minifyOption) {
          case 'web': {
            html = await HtmlOptimizationService.minifyForWeb(html)
            break
          }

          case 'email': {
            html = await HtmlOptimizationService.minifyForEmail(html)
            break
          }

          default: {
            throw new UnreachableCaseError(minifyOption satisfies never)
          }
        }
      }
    }

    const textEngine = TemplateEngine.getTextInstance()
    const text = this.textTemplatePath ? textEngine.render(this.textTemplatePath, payload) : ''

    return {
      html,
      text,
      attachments: this.getAttachments(),
    }
  }
}
