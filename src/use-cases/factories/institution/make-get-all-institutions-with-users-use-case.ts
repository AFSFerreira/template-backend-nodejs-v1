import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { GetAllInstitutionsWithUsersUseCase } from '@use-cases/institution/get-all-institutions-with-user'

export function makeGetAllInstitutionsWithUsersUseCase() {
  const institutionsRepository = new PrismaInstitutionsRepository()
  const getAllInstitutionsWithUsersUseCase = new GetAllInstitutionsWithUsersUseCase(institutionsRepository)

  return getAllInstitutionsWithUsersUseCase
}
