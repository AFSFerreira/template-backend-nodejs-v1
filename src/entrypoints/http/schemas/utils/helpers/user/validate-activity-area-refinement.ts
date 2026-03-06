import type { ActivityAreaValidationData } from '@custom-types/http/schemas/utils/helpers/users/activity-area-validation-data'
import type { z } from 'zod'
import { ACTIVITY_AREA_MISSING_DESCRIPTION } from '@messages/validations/user-validations'

function validateDescriptionRule(
  areaValue: string,
  descriptionValue: string | null | undefined,
  fieldPath: string[],
  value: ActivityAreaValidationData,
  issues: z.core.$ZodRawIssue[],
) {
  const isOther = areaValue === 'OUTRA'
  const hasDescription = !!descriptionValue

  if (isOther !== hasDescription) {
    issues.push({
      code: 'custom',
      input: value,
      continue: true,
      message: ACTIVITY_AREA_MISSING_DESCRIPTION,
      path: ['activityAreas', ...fieldPath],
    })
  }
}

export function validateActivityAreaRefinement({
  value,
  issues,
}: {
  value: ActivityAreaValidationData
  issues: z.core.$ZodRawIssue[]
}) {
  if (!value.activityArea) return

  if (value.activityArea.mainActivityArea) {
    validateDescriptionRule(
      value.activityArea.mainActivityArea,
      value.user?.activityAreaDescription,
      ['mainActivityArea'],
      value,
      issues,
    )
  }

  if (value.activityArea.subActivityArea) {
    validateDescriptionRule(
      value.activityArea.subActivityArea,
      value.user?.subActivityAreaDescription,
      ['subActivityArea'],
      value,
      issues,
    )
  }
}
