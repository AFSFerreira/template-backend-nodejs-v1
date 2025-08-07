import { nonemptyTextSchema } from './nonempty-text'

export const upperCaseTextSchema = nonemptyTextSchema.transform((data) =>
  data.toUpperCase(),
)
