import type { ActivityArea, ActivityAreaType } from '@prisma/generated/client'

export interface ActivityAreaDefaultPresenterInput extends ActivityArea {}

export interface HTTPActivityArea {
  area: string
  type: ActivityAreaType
}
