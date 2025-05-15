import type { ForgotPasswordRendererInput } from '@custom-types/services/renderers/user/emails/forgot-password-renderer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { FORGOT_PASSWORD_HTML_TEMPLATE, FORGOT_PASSWORD_TEXT_TEMPLATE } from '@constants/static-file-constants'
import { env } from '@env/index'
import { BaseRenderer } from '@services/renderers/base-renderer'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { injectable } from 'tsyringe'

/**
 * Renderizador do e-mail de recuperação de senha.
 *
 * Gera link com token para o frontend em `/reset-password?token={token}`.
 */
@injectable()
export class ForgotPasswordRenderer extends BaseRenderer<ForgotPasswordRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, FORGOT_PASSWORD_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, FORGOT_PASSWORD_TEXT_TEMPLATE)

  protected mapPayload(input: ForgotPasswordRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      username: input.username,
      url: `${env.FRONTEND_URL}/reset-password?token=${input.token}`,
      app_name: APP_NAME,
    }
  }
}
