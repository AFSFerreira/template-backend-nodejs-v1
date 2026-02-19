import { COMPARISON_OPERATORS } from '@custom-types/custom/orderable'
import z from 'zod'

export const comparableEnumSchema = z.enum(COMPARISON_OPERATORS)
