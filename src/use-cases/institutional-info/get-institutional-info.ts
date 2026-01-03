import type { GetInstitutionalInfoUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetInstitutionalInfoUseCase {
  constructor(
    @inject(tokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute(): Promise<GetInstitutionalInfoUseCaseResponse> {
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
