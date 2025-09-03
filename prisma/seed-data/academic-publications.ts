import { ActivityAreaType } from '@prisma/client'
import { subActivityAreasData } from './activity-areas'

export const academicPublicationsData = [
  {
    authors: 'USER',
    publicationDate: new Date(),
    title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 1',
    linkDoi: 'https://example.com',
    editionNumber: '12',
    journalName: 'ASTROBIO',
    pageInterval: '1-5',
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
    publicationDate: new Date(),
    title: 'A ASCENSÃO DA ASTROBIOLOGIA - PARTE 2',
    linkDoi: 'https://example.com',
    editionNumber: '12',
    journalName: 'ASTROBIO',
    pageInterval: '5-10',
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
