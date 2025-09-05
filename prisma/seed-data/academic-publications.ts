import { ActivityAreaType } from '@prisma/client'
import { subActivityAreasData } from './activity-areas'

export const academicPublicationsData = [
  {
    authors: 'USER',
    publicationYear: 2023,
    title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 1',
    linkDoi: 'https://example.com',
    editionNumber: '12',
    journalName: 'ASTROBIO',
    startPage: '20',
    volume: '6',
    ActivityArea: {
      connect: {
        type_area: {
          area: subActivityAreasData[0],
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
      },
    },
  },
  {
    authors: 'USER',
    publicationYear: 2024,
    title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 2',
    linkDoi: 'https://example.com',
    editionNumber: '12',
    journalName: 'ASTROBIO',
    startPage: '5',
    volume: '6',
    ActivityArea: {
      connect: {
        type_area: {
          area: subActivityAreasData[0],
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
      },
    },
  },
]
