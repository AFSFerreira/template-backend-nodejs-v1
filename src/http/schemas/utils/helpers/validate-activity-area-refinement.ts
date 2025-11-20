import type { ActivityAreaValidationData } from "@custom-types/custom/activity-area-validation-data"
import { ACTIVITY_AREA_MISSING_DESCRIPTION } from "@messages/validations"
import type z from "zod"

export function validateActivityAreaRefinement(
  data: ActivityAreaValidationData,
  ctx: z.RefinementCtx
) {
  if (data.activityArea.mainActivityArea === 'OUTRA' && !data.user.activityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'mainActivityArea'],
    })
  }

  if (data.activityArea.mainActivityArea !== 'OUTRA' && data.user.activityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'mainActivityArea'],
    })
  }

  if (data.activityArea.subActivityArea === 'OUTRA' && !data.user.subActivityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    })
  }

  if (data.activityArea.subActivityArea !== 'OUTRA' && data.user.subActivityAreaDescription) {
    ctx.addIssue({
      code: 'custom',
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', 'subActivityArea'],
    })
  }
}
