import path from 'node:path'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { APP_NAME } from '@constants/env-constants'
import { MEMBERSHIP_REJECTED_HTML_TEMPLATE, MEMBERSHIP_REJECTED_TEXT_TEMPLATE } from '@constants/static-file-constants'
import { BaseRenderer } from '@services/renderers/base-renderer'
import { toTitleCasePortuguese } from '@utils/formatters/to-title-case-portuguese'

interface MembershipRejectedRendererInput {
  fullName: string
  email: string
}

export class MembershipRejectedRenderer extends BaseRenderer<MembershipRejectedRendererInput> {
  protected readonly htmlTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, MEMBERSHIP_REJECTED_HTML_TEMPLATE)
  protected readonly textTemplatePath = path.resolve(NUNJUCKS_TEMPLATES_ROOT_PATH, MEMBERSHIP_REJECTED_TEXT_TEMPLATE)

  protected mapPayload(input: MembershipRejectedRendererInput) {
    return {
      full_name: toTitleCasePortuguese(input.fullName),
      email: input.email,
      app_name: APP_NAME,
    }
  }
}
