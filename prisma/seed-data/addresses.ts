import type { Prisma } from '@prisma/client'

type PartialAddressCreateInput = Omit<Prisma.AddressCreateInput, 'User' | 'State'>

export const addressData1: PartialAddressCreateInput = {
  number: '800',
  zip: '06210-138',
  street: 'RUA ARMÊNIA',
  district: 'PRESIDENTE ALTINO',
  city: 'OSASCO',
}

export const addressData2: PartialAddressCreateInput = {
  number: '50',
  zip: '22290-240',
  street: 'AVENIDA PASTEUR',
  district: 'URCA',
  city: 'RIO DE JANEIRO',
}

export const addressDataArray: PartialAddressCreateInput[] = [addressData1, addressData2]
