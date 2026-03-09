import type { ChangeEmailRendererInput } from '@custom-types/services/renderers/user/emails/change-email-renderer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { CHANGE_EMAIL_HTML_TEMPLATE, CHANGE_EMAIL_TEXT_TEMPLATE } from '@constants/static-file-constants'
import { env } from '@env/index'
import { BaseRenderer } from '@services/renderers/base-renderer'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

/**
 * Renderizador do e-mail de confirmação de alteração de endereço de e-mail.
 *
 * Gera link com token para o frontend em `/confirmar-alteracao-email/{token}`.
 */
export class ChangeEmailRenderer extends BaseRenderer<ChangeEmailRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CHANGE_EMAIL_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, CHANGE_EMAIL_TEXT_TEMPLATE)

  protected mapPayload(input: ChangeEmailRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      old_email: input.oldEmail,
      new_email: input.newEmail,
      url: `${env.FRONTEND_URL}/confirmar-alteracao-email/${input.token}`,
      app_name: APP_NAME,
    }
  }
}
