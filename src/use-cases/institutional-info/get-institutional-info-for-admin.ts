import type { GetInstitutionalInfoForAdminUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info-for-admin'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetInstitutionalInfoForAdminUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute(): Promise<GetInstitutionalInfoForAdminUseCaseResponse> {
    const institutionalInfo = await this.institutionalInfoRepository.getInstitutionalInfo()

    return { institutionalInfo }
  }
}
