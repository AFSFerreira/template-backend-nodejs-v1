import type { ActivityAreaType } from '@prisma/generated/enums'

export type PartialActivityAreas = Array<{
  area: string
  type: ActivityAreaType
}>
