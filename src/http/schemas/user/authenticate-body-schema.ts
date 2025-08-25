import { messages } from '@constants/messages'
import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/nonempty-text'

export const authenticateBodySchema = z.object(
  {
    login: nonemptyTextSchema,
    password: nonemptyTextSchema,
  },
  messages.validation.invalidAuthenticationInput,
)

export type AuthenticateSchemaType = z.infer<typeof authenticateBodySchema>
