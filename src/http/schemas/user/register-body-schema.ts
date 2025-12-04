import { educationLevelSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { transformRegisterBodySchema } from '@schemas/utils/helpers/user/transform-register-body.'
import { z } from 'zod'

const registerBodyRawSchema = z
  .object({
    user: z
      .object({
        educationLevel: educationLevelSchema,
      })
      .loose(),
  })
  .loose()

export const registerBodySchema = registerBodyRawSchema.transform(transformRegisterBodySchema)
