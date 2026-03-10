import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'

export const InstitutionalInfoDefaultPresenter = {
  toHTTP(input: InstitutionalInfoPresenterInput): HTTPInstitutionalInfo {
    return {
      aboutImage: buildInstitutionalAboutImageUrl(input.aboutImage),
      statuteFile: buildStatuteUrl(input.statuteFile),
      electionNoticeFile: buildElectionNoticeUrl(input.electionNoticeFile),
    }
  },

  toHTTPList(inputs: InstitutionalInfoPresenterInput[]): HTTPInstitutionalInfo[] {
    return inputs.map(this.toHTTP)
  },
}
