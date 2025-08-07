import { cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import { nonemptyTextSchema } from './nonempty-text'
import { messages } from '@/constants/messages'

export const cpfSchema = z.preprocess(
  (data) => (typeof data === 'string' ? cpf.strip(data) : data),
  nonemptyTextSchema
    .length(11, { message: messages.validation.invalidCpfLength })
    .refine(cpf.isValid, { message: messages.validation.invalidCpfFormat })
    .transform(cpf.format),
)
