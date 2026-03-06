import type { EducationLevelTransformData } from '@custom-types/http/schemas/utils/helpers/users/education-level-transform-data'
import type { RefinementCtx, ZodType } from 'zod'
import {
  highLevelEducationEnumSchema,
  highLevelStudentEnumSchema,
  lowLevelEducationEnumSchema,
} from '@lib/zod/utils/enums/education-level-enum-schema'
import { INVALID_EDUCATION_LEVEL_TYPE } from '@messages/validations/user-validations'
import { EducationLevelType } from '@prisma/generated/enums'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { z } from 'zod'
import { highLevelEducationUpdateBodySchema } from '../../components/user/high-level-education-update-body-schema'
import { highLevelStudentUpdateBodySchema } from '../../components/user/high-level-student-update-body-schema'
import { lowLevelEducationUpdateBodySchema } from '../../components/user/low-level-education-update-body-schema'

export function transformUpdateBody(data: EducationLevelTransformData, ctx: RefinementCtx) {
  const educationLevel = data.user.educationLevel

  // NOTE: A ordem de verificação dos schemas importa!
  const targetSchema = getTrueMapping<ZodType>([
    {
      expression: highLevelStudentEnumSchema.safeParse(educationLevel).success,
      value: highLevelStudentUpdateBodySchema,
    },
    {
      expression: highLevelEducationEnumSchema.safeParse(educationLevel).success,
      value: highLevelEducationUpdateBodySchema,
    },
    {
      expression: lowLevelEducationEnumSchema.safeParse(educationLevel).success,
      value: lowLevelEducationUpdateBodySchema,
    },
  ])

  if (!targetSchema) {
    ctx.addIssue({
      code: 'custom',
      message: INVALID_EDUCATION_LEVEL_TYPE,
      path: ['user', 'educationLevel'],
      received: educationLevel,
      options: EducationLevelType,
    })

    return z.NEVER
  }

  const result = targetSchema.safeParse(data)

  if (!result.success) {
    for (const issue of result.error.issues) {
      ctx.addIssue({ ...issue })
    }

    return z.NEVER
  }

  return result.data
}
