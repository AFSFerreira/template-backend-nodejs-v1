import { COMPARISON_OPERATORS } from '@custom-types/orderable'
import z from 'zod'

export const comparableEnumSchema = z.enum(COMPARISON_OPERATORS)
