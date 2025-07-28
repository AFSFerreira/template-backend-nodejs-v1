import type { AcademicPublications } from '@prisma/client'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'

interface CreateAcademicPublicationUseCaseRequest {
  title: string
  authors: string
  publicationDate: Date
  userId: string
  journalName: string
  volume: string
  editionNumber: string
  pageInterval: string
  doiLink: string
}

interface CreateAcademicPublicationUseCaseResponse {
  academicPublication: AcademicPublications
}

export class CreateAcademicPublicationUseCase {
  constructor(
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
  ) {}

  async execute({
    title,
    authors,
    publicationDate,
    journalName,
    volume,
    editionNumber,
    pageInterval,
    doiLink,
    userId,
  }: CreateAcademicPublicationUseCaseRequest): Promise<CreateAcademicPublicationUseCaseResponse> {
    const academicPublication =
      await this.academicPublicationsRepository.create({
        title,
        authors,
        publicationDate,
        journalName,
        volume,
        editionNumber,
        pageInterval,
        doiLink,
        userId,
      })

    return { academicPublication }
  }
}
