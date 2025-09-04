import { COMPARISON_OPERATORS } from '@custom-types/orderable-type'
import z from 'zod'

export const comparableSchema = z.enum(COMPARISON_OPERATORS)
