import type { Prisma } from '@prisma/client'
import { academicPublicationsAuthorsCreateNestedAcademicPublicationData1 } from './academic-pulication-authors'
import { subActivityAreaData1 } from './activity-areas'

const academicPublicationsCreateUserData1: Prisma.AcademicPublicationCreateWithoutUserInput = {
  publicationYear: 2023,
  title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 1',
  linkDoi: 'https://example.com',
  editionNumber: '12',
  journalName: 'ASTROBIO',
  startPage: '20',
  volume: '6',
  ActivityArea: {
    connect: {
      type_area: subActivityAreaData1,
    },
  },
  AcademicPublicationAuthors: academicPublicationsAuthorsCreateNestedAcademicPublicationData1,
}

const academicPublicationsCreateUserData2: Prisma.AcademicPublicationCreateWithoutUserInput = {
  publicationYear: 2024,
  title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 2',
  linkDoi: 'https://example.com',
  editionNumber: '12',
  journalName: 'ASTROBIO',
  startPage: '5',
  volume: '6',
  ActivityArea: {
    connect: {
      type_area: subActivityAreaData1,
    },
  },
  AcademicPublicationAuthors: academicPublicationsAuthorsCreateNestedAcademicPublicationData1,
}

export const academicPublicationsCreateUserDataArray1: Prisma.AcademicPublicationCreateWithoutUserInput[] = [
  academicPublicationsCreateUserData1,
  academicPublicationsCreateUserData2,
]
