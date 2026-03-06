import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import z from 'zod'
import { transformUpdateBody } from '../../helpers/user/transform-update-body'

const updateUserBodyRawSchema = z
  .object({
    user: z
      .object({
        educationLevel: educationLevelSchema,
      })
      .loose(),
  })
  .loose()

export const updateUserBodySchema = updateUserBodyRawSchema.transform(transformUpdateBody)
