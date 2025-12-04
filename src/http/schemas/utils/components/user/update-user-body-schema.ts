import z from 'zod'
import { educationLevelSchema } from '../../enums/education-level-enum-schema'
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
