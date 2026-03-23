import type { ConfirmAccountRendererInput } from '@custom-types/services/renderers/user/emails/confirm-account-renderer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { CONFIRM_ACCOUNT_HTML_TEMPLATE, CONFIRM_ACCOUNT_TEXT_TEMPLATE } from '@constants/static-file-constants'
import { env } from '@env/index'
import { BaseRenderer } from '@services/renderers/base-renderer'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { injectable } from 'tsyringe'

/**
 * Renderizador do e-mail de verificação de conta.
 *
 * Gera link com token para o frontend em `/verificar-email/{token}`.
 */
@injectable()
export class ConfirmAccountRenderer extends BaseRenderer<ConfirmAccountRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CONFIRM_ACCOUNT_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CONFIRM_ACCOUNT_TEXT_TEMPLATE)

  protected mapPayload(input: ConfirmAccountRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      url: `${env.FRONTEND_URL}/verificar-email/${input.token}`,
      app_name: APP_NAME,
    }
  }
}
