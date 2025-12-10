import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllDirectorPositionsSchema = z.object().partial().extend(paginatedSchema.shape)
