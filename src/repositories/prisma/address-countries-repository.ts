import { prisma } from '@lib/prisma'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import { injectable } from 'tsyringe'

@injectable()
export class PrismaAddressCountriesRepository implements AddressCountryRepository {
  async findOrCreate(name: string) {
    const addressCountry = await prisma.addressCountry.upsert({
      where: { name },
      update: {},
      create: { name },
    })

    return addressCountry
  }
}
