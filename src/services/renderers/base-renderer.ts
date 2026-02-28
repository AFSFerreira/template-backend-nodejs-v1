import type { RendererOutput } from '@custom-types/services/renderers/renderer-output'
import type { Attachment } from 'nodemailer/lib/mailer'
import { TemplateEngine } from './template-engine'

export abstract class BaseRenderer<TInput> {
  protected abstract readonly htmlTemplatePath: string
  protected readonly textTemplatePath: string | null = null

  protected abstract mapPayload(input: TInput): Record<string, unknown>

  protected getAttachments(): Attachment[] {
    return []
  }

  public render(input: TInput): RendererOutput {
    const engine = TemplateEngine.getInstance()
    const payload = this.mapPayload(input)

    return {
      html: engine.render(this.htmlTemplatePath, payload),
      text: this.textTemplatePath ? engine.render(this.textTemplatePath, payload) : '',
      attachments: this.getAttachments(),
    }
  }
}
