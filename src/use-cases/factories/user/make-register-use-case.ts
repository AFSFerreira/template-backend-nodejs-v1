import { PrismaActivityAreaRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaInstitutionRepository } from '@repositories/prisma/prisma-institution-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@use-cases/user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const activityAreasRepository = new PrismaActivityAreaRepository()
  const institutionRepository = new PrismaInstitutionRepository()

  const registerUseCase = new RegisterUseCase(
    usersRepository,
    activityAreasRepository,
    institutionRepository,
  )

  return registerUseCase
}
