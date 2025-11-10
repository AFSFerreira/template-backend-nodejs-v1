import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@use-cases/user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const activityAreasRepository = new PrismaActivityAreasRepository()
  const institutionsRepository = new PrismaInstitutionsRepository()

  const registerUseCase = new RegisterUseCase(usersRepository, activityAreasRepository, institutionsRepository)

  return registerUseCase
}
