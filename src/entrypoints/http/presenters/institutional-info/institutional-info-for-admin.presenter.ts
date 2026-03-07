import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info-for-admin'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'

export class InstitutionalInfoForAdminPresenter
  implements IPresenterStrategy<InstitutionalInfoForAdminPresenterInput, HTTPInstitutionalInfoForAdmin>
{
  public toHTTP(input: InstitutionalInfoForAdminPresenterInput): HTTPInstitutionalInfoForAdmin {
    return {
      aboutImage: input.aboutImage,
      aboutDescription: input.aboutDescription as ProseMirrorSchemaType,
      statuteFile: input.statuteFile,
      electionNoticeFile: input.electionNoticeFile,
    }
  }
}
