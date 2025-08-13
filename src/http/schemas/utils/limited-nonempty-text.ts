import { nonemptyTextSchema } from './nonempty-text'
import { LIMITED_CHARACTERS_SIZE } from '@/constants/zod-constants'

export const limitedNonemptyTextSchema = nonemptyTextSchema.max(
  LIMITED_CHARACTERS_SIZE,
)
