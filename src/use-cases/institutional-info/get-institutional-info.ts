import type { GetInstitutionalInfoUseCaseResponse } from '@custom-types/use-cases/institutional-info/get-institutional-info'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetInstitutionalInfoUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute(): Promise<GetInstitutionalInfoUseCaseResponse> {
    const institutionalInfo = await this.institutionalInfoRepository.getInstitutionalInfo()

    return { institutionalInfo }
  }
}
