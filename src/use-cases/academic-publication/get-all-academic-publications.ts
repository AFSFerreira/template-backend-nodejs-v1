import type {
  GetAllAcademicPublicationsUseCaseRequest,
  GetAllAcademicPublicationsUseCaseResponse,
} from '@custom-types/use-cases/academic-publications/get-all-academic-publications'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllAcademicPublicationsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.academicPublications)
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
  ) {}

  async execute(
    getAllAcademicPublicationsUseCaseInput: GetAllAcademicPublicationsUseCaseRequest,
  ): Promise<GetAllAcademicPublicationsUseCaseResponse> {
    const academicPublications = await this.academicPublicationsRepository.listAllAcademicPublications(
      getAllAcademicPublicationsUseCaseInput,
    )

    return academicPublications
  }
}
