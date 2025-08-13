import z from 'zod'
import { LIMITED_CHARACTERS_SIZE } from '@/constants/zod-constants'

export const emailSchema = z.email().max(LIMITED_CHARACTERS_SIZE)
