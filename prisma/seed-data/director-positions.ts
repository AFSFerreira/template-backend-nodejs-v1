import type { Prisma } from '@prisma/client'

export const directorPositionData1: Prisma.DirectorPositionCreateInput = {
  position: 'Presidente',
  precedence: 1,
}

export const directorPositionData2: Prisma.DirectorPositionCreateInput = {
  position: 'Vice Presidente',
  precedence: 2,
}

export const directorPositionData3: Prisma.DirectorPositionCreateInput = {
  position: 'Secretário(a) Geral',
  precedence: 3,
}

export const directorPositionData4: Prisma.DirectorPositionCreateInput = {
  position: 'Secretário(a) de Ensino',
  precedence: 4,
}

export const directorPositionData5: Prisma.DirectorPositionCreateInput = {
  position: 'Secretário(a) de Divulgação',
  precedence: 4,
}

export const directorPositionData6: Prisma.DirectorPositionCreateInput = {
  position: 'Conselheiro(a)',
  precedence: 4,
}

export const directorPositionData7: Prisma.DirectorPositionCreateInput = {
  position: 'Tesoureiro(a)',
  precedence: 4,
}

export const directorPositionData8: Prisma.DirectorPositionCreateInput = {
  position: 'Secretário(a)',
  precedence: 5,
}

export const directorPositionsArray: Prisma.DirectorPositionCreateInput[] = [
  directorPositionData1,
  directorPositionData2,
  directorPositionData3,
  directorPositionData4,
  directorPositionData5,
  directorPositionData6,
  directorPositionData7,
  directorPositionData8,
]
