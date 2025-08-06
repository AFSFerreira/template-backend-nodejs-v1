import { nonemptyTextSchema } from './nonempty-text'
import { limitedCharactersSize } from '@/constants/zod-constants'

export const limitedNonemptyTextSchema = nonemptyTextSchema.max(
  limitedCharactersSize,
)
