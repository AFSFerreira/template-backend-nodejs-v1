import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaAddressCountriesRepository implements AddressCountryRepository {
  constructor(
    @inject(tokens.infra.database)
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
