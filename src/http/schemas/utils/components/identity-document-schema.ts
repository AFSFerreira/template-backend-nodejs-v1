import {
  PASSPORT_VALIDATION_REGEX,
  RNE_VALIDATION_REGEX,
} from '@constants/regex'
import {
  INVALID_CPF_FORMAT,
  INVALID_CPF_LENGTH,
  INVALID_PASSPORT_FORMAT,
  INVALID_RNE_FORMAT,
} from '@messages/validation'
import { IdentityType } from '@prisma/client'
import { cpf } from 'cpf-cnpj-validator'
import z from 'zod'
import { upperCaseTextSchema } from '../primitives/uppercase-text-schema'
import { uppercaseTextWithoutInnerSpacesSchema } from '../primitives/uppercase-text-without-inner-spaces-schema'

const cpfIdentityDocumentSchema = z.preprocess(
  (data) => (typeof data === 'string' ? cpf.strip(data) : data),
  uppercaseTextWithoutInnerSpacesSchema
    .length(11, { message: INVALID_CPF_LENGTH })
    .refine(cpf.isValid, { message: INVALID_CPF_FORMAT })
    .transform(cpf.format),
)

const rneIdentityDocumentSchema = upperCaseTextSchema.regex(
  RNE_VALIDATION_REGEX,
  INVALID_RNE_FORMAT,
)

const passportIdentityDocumentSchema = upperCaseTextSchema.regex(
  PASSPORT_VALIDATION_REGEX,
  INVALID_PASSPORT_FORMAT,
)

const cpfSchema = z.object({
  identityType: z.literal(IdentityType.CPF),
  identityDocument: cpfIdentityDocumentSchema,
})

const rneSchema = z.object({
  identityType: z.literal(IdentityType.RNE),
  identityDocument: rneIdentityDocumentSchema,
})

const passportSchema = z.object({
  identityType: z.literal(IdentityType.PASSPORT),
  identityDocument: passportIdentityDocumentSchema,
})

export const identityDocumentSchema = z.discriminatedUnion('identityType', [
  cpfSchema,
  rneSchema,
  passportSchema,
])
