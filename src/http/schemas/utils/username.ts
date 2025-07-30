import { nonemptyTextSchema } from './nonempty-text'

export const usernameSchema = nonemptyTextSchema.min(5)
