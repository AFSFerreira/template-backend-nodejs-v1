import { CreateAcademicPublicationUseCase } from '../create-academic-publication-use-case'
import { PrismaAcademicPublicationsRepository } from '@/repositories/prisma/prisma-academic-publications-repository'

export function makeCreateAcademicPublicationUseCase() {
  const academicPublicationsRepository =
    new PrismaAcademicPublicationsRepository()
  return new CreateAcademicPublicationUseCase(academicPublicationsRepository)
}
