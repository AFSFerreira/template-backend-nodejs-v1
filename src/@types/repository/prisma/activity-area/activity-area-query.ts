import type { ActivityAreaType } from '@prisma/client'

export interface ActivityAreaQuery {
  area: string
  type: ActivityAreaType
}
