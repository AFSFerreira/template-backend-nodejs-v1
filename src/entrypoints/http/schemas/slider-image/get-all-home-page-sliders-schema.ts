import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllHomePageSlidersSchema = z.object().partial().extend(paginatedSchema.shape)
