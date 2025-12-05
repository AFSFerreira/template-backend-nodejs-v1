import { PrismaAddressCountriesRepository } from '@repositories/prisma/address-countries-repository'
import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { PrismaAddressStatesRepository } from '@repositories/prisma/prisma-address-states-repository'
import { PrismaInstitutionsRepository } from '@repositories/prisma/prisma-institutions-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@use-cases/user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const activityAreasRepository = new PrismaActivityAreasRepository()
  const institutionsRepository = new PrismaInstitutionsRepository()
  const addressStatesRepository = new PrismaAddressStatesRepository()
  const addressCountriesRepository = new PrismaAddressCountriesRepository()

  const registerUseCase = new RegisterUseCase(
    usersRepository,
    activityAreasRepository,
    institutionsRepository,
    addressStatesRepository,
    addressCountriesRepository,
  )

  return registerUseCase
}
