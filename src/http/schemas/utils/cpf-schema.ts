import { IdentityType } from '@prisma/client'
import { cpf } from 'cpf-cnpj-validator'
import { INVALID_CPF_FORMAT, INVALID_CPF_LENGTH } from 'src/messages/validation'
import { z } from 'zod'
import { uppercaseTextWithoutInnerSpacesSchema } from './uppercase-text-without-inner-spaces-schema'

export const cpfSchema = z.object({
  identityType: z.literal(IdentityType.CPF),
  identityDocument: z.preprocess(
    (data) => (typeof data === 'string' ? cpf.strip(data) : data),
    uppercaseTextWithoutInnerSpacesSchema
      .length(11, { message: INVALID_CPF_LENGTH })
      .refine(cpf.isValid, { message: INVALID_CPF_FORMAT })
      .transform(cpf.format),
  ),
})
