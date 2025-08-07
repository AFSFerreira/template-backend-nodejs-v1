import { nonemptyTextSchema } from './nonempty-text'
import { REMOVE_INNER_SPACES_REGEX } from '@/constants/regex'

export const upperCaseTextWithoutInnerSpacesSchema =
  nonemptyTextSchema.transform((data) =>
    data.toUpperCase().replace(REMOVE_INNER_SPACES_REGEX, ''),
  )
