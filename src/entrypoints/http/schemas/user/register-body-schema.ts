import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { z } from 'zod'
import { transformRegisterBodySchema } from '../utils/helpers/user/transform-register-body'

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
