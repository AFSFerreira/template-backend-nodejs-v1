import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { GetAllInstitutionsNamesUseCase } from '@use-cases/institution/get-all-institutions-names'

export function makeGetAllInstitutionsNamesUseCase() {
  const institutionsRepository = new PrismaInstitutionsRepository()
  const getAllInstitutionsNamesUseCase = new GetAllInstitutionsNamesUseCase(institutionsRepository)

  return getAllInstitutionsNamesUseCase
}
