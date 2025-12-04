import { INVALID_AUTHENTICATION_INPUT } from '@messages/validations'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { z } from 'zod'

export const authenticateBodySchema = z.object(
  {
    login: limitedNonemptyTextSchema,
    password: limitedNonemptyTextSchema,
  },
  {
    error: INVALID_AUTHENTICATION_INPUT,
  },
)
