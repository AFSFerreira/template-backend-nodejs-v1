import { cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import { nonemptyTextSchema } from './nonempty-text'
import { messages } from '@/constants/messages'
import { REMOVE_ALL_NON_DIGITS_REGEX } from '@/constants/regex'

export const cpfSchema = z.preprocess(
  (data) =>
    typeof data === 'string'
      ? data.replace(REMOVE_ALL_NON_DIGITS_REGEX, '')
      : data,
  nonemptyTextSchema
    .length(11, { message: messages.validation.invalidCpfLength })
    .refine(cpf.isValid, { message: messages.validation.invalidCpfFormat })
    .transform(cpf.format),
)
