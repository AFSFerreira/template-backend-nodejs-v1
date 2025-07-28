import { PrismaAcademicPublicationsRepository } from '@/repositories/prisma/prisma-academic-publications-repository'
import { CreateAcademicPublicationUseCase } from '@/use-cases/academic-publication/create-academic-publication-use-case'

export function makeCreateAcademicPublicationUseCase() {
  const academicPublicationsRepository =
    new PrismaAcademicPublicationsRepository()
  return new CreateAcademicPublicationUseCase(academicPublicationsRepository)
}
