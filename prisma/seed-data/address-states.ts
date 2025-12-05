import type { Prisma } from '@prisma/client'
import { addressCountry1 } from './address-country'

export const addressState1: Prisma.AddressStateCreateInput = {
  name: 'RJ',
  Country: {
    connectOrCreate: {
      create: { name: addressCountry1.name },
      where: { name: addressCountry1.name },
    },
  },
}

export const addressState2: Prisma.AddressStateCreateInput = {
  name: 'SP',
  Country: {
    connectOrCreate: {
      create: { name: addressCountry1.name },
      where: { name: addressCountry1.name },
    },
  },
}

export const addressStatesArray: Prisma.AddressStateCreateInput[] = [addressState1, addressState2]
