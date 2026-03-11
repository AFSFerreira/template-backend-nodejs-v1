import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionalInfoForAdmin,
  InstitutionalInfoForAdminPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info-for-admin'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { InstitutionalInfoUrlBuilderService } from '@services/builders/urls/build-institutional-about-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class InstitutionalInfoForAdminPresenter
  implements IPresenterStrategy<InstitutionalInfoForAdminPresenterInput, HTTPInstitutionalInfoForAdmin>
{
  constructor(
    @inject(InstitutionalInfoUrlBuilderService)
    private readonly institutionalInfoUrlBuilderService: InstitutionalInfoUrlBuilderService,
  ) {}

  public toHTTP(input: InstitutionalInfoForAdminPresenterInput): HTTPInstitutionalInfoForAdmin {
    return {
      aboutImage: this.institutionalInfoUrlBuilderService.buildAboutImageUrl(input.aboutImage),
      aboutDescription: input.aboutDescription as ProseMirrorSchemaType,
      statuteFile: this.institutionalInfoUrlBuilderService.buildStatuteUrl(input.statuteFile),
      electionNoticeFile: this.institutionalInfoUrlBuilderService.buildElectionNoticeUrl(input.electionNoticeFile),
    }
  }

  toHTTPList(inputs: InstitutionalInfoForAdminPresenterInput[]): HTTPInstitutionalInfoForAdmin[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
