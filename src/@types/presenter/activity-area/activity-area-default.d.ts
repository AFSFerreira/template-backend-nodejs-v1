import type { ActivityAreaType } from '@prisma/client'

export interface HTTPActivityArea {
  area: string
  type: ActivityAreaType
}
