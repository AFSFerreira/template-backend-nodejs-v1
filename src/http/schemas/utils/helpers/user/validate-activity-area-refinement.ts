import type { ActivityAreaValidationData } from '@custom-types/schemas/utils/activity-area-validation-data'
import { ACTIVITY_AREA_MISSING_DESCRIPTION } from '@messages/validations/user-validations'
import type { RefinementCtx } from 'zod'
import { z } from 'zod'

export function validateActivityAreaRefinement(data: ActivityAreaValidationData, ctx: RefinementCtx) {
  if (!data.activityArea) return

  if (data.activityArea.mainActivityArea === 'OUTRA' && !data.user?.activityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'mainActivityArea'],
    })
    return z.NEVER
  }

  if (data.activityArea.mainActivityArea !== 'OUTRA' && data.user?.activityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'mainActivityArea'],
    })
    return z.NEVER
  }

  if (data.activityArea.subActivityArea === 'OUTRA' && !data.user?.subActivityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    })
    return z.NEVER
  }

  if (data.activityArea.subActivityArea !== 'OUTRA' && data.user?.subActivityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    })
    return z.NEVER
  }
}
