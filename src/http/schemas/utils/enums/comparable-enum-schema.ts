import { COMPARISON_OPERATORS } from '@custom-types/validators/orderable'
import z from 'zod'

export const comparableEnumSchema = z.enum(COMPARISON_OPERATORS)
