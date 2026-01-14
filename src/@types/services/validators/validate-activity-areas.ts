import type { ActivityArea, ActivityAreaType } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'

type PartialActivityAreas = Array<{
  area: string
  type: ActivityAreaType
}>

export interface IValidateActivityAreas {
  activityAreas: PartialActivityAreas
  activityAreasRepository: ActivityAreasRepository
}

export type IValidatedActivityAreas =
  | {
      validatedActivityAreas: PartialActivityAreas
      success: false
    }
  | {
      validatedActivityAreas: ActivityArea[]
      success: true
    }
