import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { transformRegisterBodySchema } from '@lib/zod/utils/helpers/user/transform-register-body'
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
