import { TemplateEngine } from './template-engine'

export abstract class BaseRenderer<TInput> {
  protected abstract readonly templatePath: string

  protected abstract mapPayload(input: TInput): Record<string, unknown>

  public render(input: TInput): string {
    const engine = TemplateEngine.getInstance()

    const payload = this.mapPayload(input)

    return engine.render(this.templatePath, payload)
  }
}
