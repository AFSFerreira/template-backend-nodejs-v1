import { nonemptyTextSchema } from './nonempty-text'
import { REMOVE_INNER_SPACES_REGEX } from '@/constants/regex'

export const zipSchema = nonemptyTextSchema.transform((s) =>
  s.toUpperCase().replace(REMOVE_INNER_SPACES_REGEX, ''),
)
