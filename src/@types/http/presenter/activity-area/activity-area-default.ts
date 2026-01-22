import type { ActivityArea, ActivityAreaType } from '@prisma/client'

export interface ActivityAreaDefaultPresenterInput extends ActivityArea {}

export interface HTTPActivityArea {
  area: string
  type: ActivityAreaType
}
