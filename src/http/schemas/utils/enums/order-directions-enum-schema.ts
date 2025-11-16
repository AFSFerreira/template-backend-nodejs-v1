import { ORDER_DIRECTIONS } from '@custom-types/validator/orderable'
import z from 'zod'

export const orderDirectionsEnumSchema = z.enum(ORDER_DIRECTIONS)
