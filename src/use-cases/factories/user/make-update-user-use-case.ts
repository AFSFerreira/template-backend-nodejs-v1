import { PrismaAddressCountriesRepository } from '@repositories/prisma/address-countries-repository'
import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaAddressStatesRepository } from '@repositories/prisma/prisma-address-states-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '@use-cases/user/update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const activityAreasRepository = new PrismaActivityAreasRepository()
  const institutionsRepository = new PrismaInstitutionsRepository()
  const addressStatesRepository = new PrismaAddressStatesRepository()
  const addressCountriesRepository = new PrismaAddressCountriesRepository()

  const updateUserUseCase = new UpdateUserUseCase(
    usersRepository,
    activityAreasRepository,
    institutionsRepository,
    addressStatesRepository,
    addressCountriesRepository,
  )

  return updateUserUseCase
}
