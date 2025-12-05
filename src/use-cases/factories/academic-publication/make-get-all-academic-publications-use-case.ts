import { PrismaAcademicPublicationsRepository } from '@repositories/prisma/prisma-academic-publications-repository'
import { GetAllAcademicPublicationsUseCase } from '@use-cases/academic-publication/get-all-academic-publications'

export function makeGetAllAcademicPublicationsUseCase() {
  const academicPublicationsRepository = new PrismaAcademicPublicationsRepository()
  const getAllAcademicPublicationsUseCase = new GetAllAcademicPublicationsUseCase(academicPublicationsRepository)

  return getAllAcademicPublicationsUseCase
}
