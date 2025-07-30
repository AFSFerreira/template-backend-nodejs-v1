import { cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import { nonemptyTextSchema } from './nonempty-text'
import { REMOVE_ALL_NON_DIGITS_REGEX } from '@/constants/regex'

export const cpfSchema = z.preprocess(
  (data) =>
    typeof data === 'string'
      ? data.replace(REMOVE_ALL_NON_DIGITS_REGEX, '')
      : data,
  nonemptyTextSchema
    .length(11, { message: 'CPF must contain 11 digits' })
    .refine(cpf.isValid, { message: 'Invalid CPF format' })
    .transform(cpf.format),
)
