import { nonemptyTextSchema } from './nonempty-text'
import { ZIP_CODE_REGEX } from '@/constants/regex'

export const zipSchema = nonemptyTextSchema.transform((s) =>
  s.toUpperCase().replace(ZIP_CODE_REGEX, ''),
)
