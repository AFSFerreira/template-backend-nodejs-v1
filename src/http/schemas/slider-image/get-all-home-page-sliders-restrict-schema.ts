import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllHomePageSlidersRestrictSchema = z.object().partial().extend(paginatedSchema.shape)
