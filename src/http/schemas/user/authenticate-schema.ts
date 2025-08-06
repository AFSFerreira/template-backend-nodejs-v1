import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/nonempty-text'
import { messages } from '@/constants/messages'

export const authenticateBodySchema = z.object(
  {
    login: nonemptyTextSchema,
    password: nonemptyTextSchema,
  },
  messages.validation.invalidAuthenticationInput,
)

export type AuthenticaticationSchemaType = z.infer<
  typeof authenticateBodySchema
>
