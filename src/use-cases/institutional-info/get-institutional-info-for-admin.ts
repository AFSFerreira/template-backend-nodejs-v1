import type { GetInstitutionalInfoForAdminUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info-for-admin'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoForAdminUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute(): Promise<GetInstitutionalInfoForAdminUseCaseResponse> {
    const institutionalInfo = await this.institutionalInfoRepository.getInstitutionalInfo()

    return {
      institutionalInfo: {
        ...institutionalInfo,
        aboutImage: buildInstitutionalAboutImageUrl(institutionalInfo.aboutImage),
        statuteFile: buildStatuteUrl(institutionalInfo.statuteFile),
        electionNoticeFile: buildElectionNoticeUrl(institutionalInfo.electionNoticeFile),
      },
    }
  }
}
