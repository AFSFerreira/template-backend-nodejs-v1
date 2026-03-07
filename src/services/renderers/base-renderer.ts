import type { RendererOutput } from '@custom-types/services/renderers/renderer-output'
import type { Attachment } from 'nodemailer/lib/mailer'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { TemplateEngine } from './template-engine'

type minifyFormat = 'web' | 'email'

interface RenderOptions {
  minify?: minifyFormat
}

export abstract class BaseRenderer<TInput> {
  protected abstract readonly htmlTemplatePath: string
  protected readonly textTemplatePath: string | null = null

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
