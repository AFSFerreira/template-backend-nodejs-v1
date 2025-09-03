import z from 'zod'
import { cpfSchema } from './cpf-schema'
import { passportSchema } from './passport-schema'
import { rneSchema } from './rne-schema'

export const identityDocumentSchema = z.discriminatedUnion('identityType', [
  cpfSchema,
  rneSchema,
  passportSchema,
])

export const optionalIdentityDocumentSchema = z.discriminatedUnion(
  'identityType',
  [
    cpfSchema,
    rneSchema,
    passportSchema,
    z.object({ identityType: z.undefined() }),
  ],
)
