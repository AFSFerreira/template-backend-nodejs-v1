import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionalInfo,
  InstitutionalInfoPresenterInput,
} from '@custom-types/http/presenter/institutional-info/institutional-info'
import { InstitutionalInfoUrlBuilderService } from '@services/builders/urls/build-institutional-about-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class InstitutionalInfoDefaultPresenter
  implements IPresenterStrategy<InstitutionalInfoPresenterInput, HTTPInstitutionalInfo>
{
  constructor(
    @inject(InstitutionalInfoUrlBuilderService)
    private readonly institutionalInfoUrlBuilderService: InstitutionalInfoUrlBuilderService,
  ) {}

  public toHTTP(input: InstitutionalInfoPresenterInput): HTTPInstitutionalInfo
  public toHTTP(input: InstitutionalInfoPresenterInput[]): HTTPInstitutionalInfo[]
  public toHTTP(
    input: InstitutionalInfoPresenterInput | InstitutionalInfoPresenterInput[],
  ): HTTPInstitutionalInfo | HTTPInstitutionalInfo[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      aboutImage: this.institutionalInfoUrlBuilderService.buildAboutImageUrl(input.aboutImage),
      statuteFile: this.institutionalInfoUrlBuilderService.buildStatuteUrl(input.statuteFile),
      electionNoticeFile: this.institutionalInfoUrlBuilderService.buildElectionNoticeUrl(input.electionNoticeFile),
    }
  }
}
