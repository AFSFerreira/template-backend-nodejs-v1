import z from 'zod'
import { cpfSchema } from './cpf-schema'
import { passportSchema } from './passport-schema'
import { rneSchema } from './rne-schema'

export const identityDocumentSchema = z.discriminatedUnion('identityType', [
  cpfSchema,
  rneSchema,
  passportSchema,
])
