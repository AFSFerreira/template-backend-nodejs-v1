import z from 'zod'
import { limitedCharactersSize } from '@/constants/zod-constants'

export const emailSchema = z.email().max(limitedCharactersSize)
