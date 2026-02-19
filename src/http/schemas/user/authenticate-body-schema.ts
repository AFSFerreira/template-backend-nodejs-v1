import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { INVALID_AUTHENTICATION_INPUT } from '@messages/validations/user-validations'
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
