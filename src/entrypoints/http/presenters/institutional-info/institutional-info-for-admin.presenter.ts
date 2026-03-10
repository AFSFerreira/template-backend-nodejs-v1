import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info-for-admin'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'

export const InstitutionalInfoForAdminPresenter = {
  toHTTP(input: InstitutionalInfoForAdminPresenterInput): HTTPInstitutionalInfoForAdmin {
    return {
      aboutImage: buildInstitutionalAboutImageUrl(input.aboutImage),
      aboutDescription: input.aboutDescription as ProseMirrorSchemaType,
      statuteFile: buildStatuteUrl(input.statuteFile),
      electionNoticeFile: buildElectionNoticeUrl(input.electionNoticeFile),
    }
  },

  toHTTPList(inputs: InstitutionalInfoForAdminPresenterInput[]): HTTPInstitutionalInfoForAdmin[] {
    return inputs.map(this.toHTTP)
  },
}
