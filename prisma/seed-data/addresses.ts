import type { Prisma } from '@prisma/client'

type PartialAddressData = Omit<Prisma.AddressCreateInput, 'User' | 'State'>

export const partialAddressData1: PartialAddressData = {
  number: '50',
  zip: '22290-240',
  street: 'AVENIDA PASTEUR',
  district: 'URCA',
  city: 'RIO DE JANEIRO',
}

export const partialAddressData2: PartialAddressData = {
  number: '800',
  zip: '06210-138',
  street: 'RUA ARMÊNIA',
  district: 'PRESIDENTE ALTINO',
  city: 'OSASCO',
}

export const partialAddressDataArray1: PartialAddressData[] = [partialAddressData1, partialAddressData2]
