import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaAddressCountriesRepository implements AddressCountryRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async findOrCreate(name: string) {
    const addressCountry = await this.dbContext.client.addressCountry.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    return addressCountry
  }
}
