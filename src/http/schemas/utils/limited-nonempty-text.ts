import { LIMITED_CHARACTERS_SIZE } from '@constants/zod-constants'
import { nonemptyTextSchema } from './nonempty-text'

export const limitedNonemptyTextSchema = nonemptyTextSchema.max(
  LIMITED_CHARACTERS_SIZE,
)
