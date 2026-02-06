import type { Prisma } from '@prisma/generated/client'
import { addressCountry1 } from './address-country'

export const addressStateData1: Prisma.AddressStateCreateInput = {
  name: 'RJ',
  Country: {
    connectOrCreate: {
      create: { name: addressCountry1.name },
      where: { name: addressCountry1.name },
    },
  },
}

export const addressStateData2: Prisma.AddressStateCreateInput = {
  name: 'SP',
  Country: {
    connectOrCreate: {
      create: { name: addressCountry1.name },
      where: { name: addressCountry1.name },
    },
  },
}

export const addressStatesDataArray1: Prisma.AddressStateCreateInput[] = [addressStateData1, addressStateData2]
