import type { ActivityAreaType } from '@prisma/generated/enums'

export interface ActivityAreaQuery {
  area: string
  type: ActivityAreaType
}
