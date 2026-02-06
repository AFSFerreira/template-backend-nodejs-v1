import type { AddressCountry } from '@prisma/generated/client'

export interface AddressCountryRepository {
  findOrCreate: (name: string) => Promise<AddressCountry>
}
