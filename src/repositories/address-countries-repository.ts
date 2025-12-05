import type { AddressCountry } from '@prisma/client'

export interface AddressCountryRepository {
  findOrCreate: (name: string) => Promise<AddressCountry>
}
