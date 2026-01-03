import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/presenter/institutional-info/institutional-info-for-admin'
import type { JSONContent } from '@tiptap/core'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.institutionalInfoForAdmin)
export class InstitutionalInfoForAdminPresenter
  implements IPresenterStrategy<InstitutionalInfoForAdminPresenterInput, HTTPInstitutionalInfoForAdmin>
{
  public toHTTP(input: InstitutionalInfoForAdminPresenterInput): HTTPInstitutionalInfoForAdmin {
    return {
      aboutImage: input.aboutImage,
      aboutDescription: input.aboutDescription as JSONContent,
      statuteFile: input.statuteFile,
      electionNoticeFile: input.electionNoticeFile,
    }
  }
}
