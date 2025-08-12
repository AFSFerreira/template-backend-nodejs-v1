import { ActivityAreaType } from '@prisma/client'
import z from 'zod'
import { upperCaseTextSchema } from '../utils/uppercase-text-schema'

export const getAllActivityAreasSchema = z.object({
  name: upperCaseTextSchema.optional(),
  type: z.enum(ActivityAreaType).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

export type getAllActivityAreasSchemaType = z.infer<
  typeof getAllActivityAreasSchema
>
