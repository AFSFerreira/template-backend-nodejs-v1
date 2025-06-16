import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AcademicPublications } from '@prisma/client'

interface CreateAcademicPublicationUseCaseRequest {
  title: string
  authors: string
  publicationDate: Date
  userId: string
}

interface CreateAcademicPublicationUseCaseResponse {
  academicPublication: AcademicPublications
}

export class CreateAcademicPublicationUseCase {
  constructor(private readonly academicPublicationsRepository: AcademicPublicationsRepository) {}

  async execute({
    title,
    authors,
    publicationDate,
    userId,
  }: CreateAcademicPublicationUseCaseRequest): Promise<CreateAcademicPublicationUseCaseResponse> {
    const academicPublication = await this.academicPublicationsRepository.create({
      title,
      authors,
      publicationDate,
      userId,
    })
    return { academicPublication }
  }
}
