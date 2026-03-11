import type { DeleteUserRendererInput } from '@custom-types/services/renderers/user/emails/delete-user-renderer'
import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { DELETE_USER_HTML_TEMPLATE, DELETE_USER_TEXT_TEMPLATE } from '@constants/static-file-constants'
import { BaseRenderer } from '@services/renderers/base-renderer'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'
import { injectable } from 'tsyringe'

/**
 * Renderizador do e-mail de notificação de exclusão de conta.
 */
@injectable()
export class DeleteUserRenderer extends BaseRenderer<DeleteUserRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, DELETE_USER_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, DELETE_USER_TEXT_TEMPLATE)

  protected mapPayload(input: DeleteUserRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      app_name: APP_NAME,
    }
  }
}
