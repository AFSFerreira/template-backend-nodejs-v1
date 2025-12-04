import type {
  GetAllAcademicPublicationsUseCaseRequest,
  GetAllAcademicPublicationsUseCaseResponse,
} from '@custom-types/use-cases/academic-publications/get-all-academic-publications'
import type { AcademicPublicationsRepository } from '@repositories/academic-publications-repository'

export class GetAllAcademicPublicationsUseCase {
  constructor(private readonly academicPublicationsRepository: AcademicPublicationsRepository) {}

  async execute(
    getAllAcademicPublicationsUseCaseInput: GetAllAcademicPublicationsUseCaseRequest,
  ): Promise<GetAllAcademicPublicationsUseCaseResponse> {
    const academicPublications = await this.academicPublicationsRepository.listAllAcademicPublications(
      getAllAcademicPublicationsUseCaseInput,
    )

    return academicPublications
  }
}
