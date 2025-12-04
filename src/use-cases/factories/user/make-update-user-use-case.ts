import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '@use-cases/user/update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const activityAreasRepository = new PrismaActivityAreasRepository()
  const institutionsRepository = new PrismaInstitutionsRepository()

  const updateUserUseCase = new UpdateUserUseCase(usersRepository, activityAreasRepository, institutionsRepository)

  return updateUserUseCase
}
