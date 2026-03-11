import type {
  GetAcademicPublicationsYearsUseCaseRequest,
  GetAcademicPublicationsYearsUseCaseResponse,
} from '@custom-types/use-cases/academic-publications/get-academic-publications-years'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAcademicPublicationsYearsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.academicPublications)
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
  ) {}

  async execute(
    query: GetAcademicPublicationsYearsUseCaseRequest,
  ): Promise<GetAcademicPublicationsYearsUseCaseResponse> {
    const result = await this.academicPublicationsRepository.getYearsWithCount(query)
    return result
  }
}
