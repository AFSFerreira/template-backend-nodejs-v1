import type { ActivityAreaType } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'

export interface IValidateActivityAreas {
  activityAreas: Array<{
    area: string
    type: ActivityAreaType
  }>
  activityAreasRepository: ActivityAreasRepository
}
