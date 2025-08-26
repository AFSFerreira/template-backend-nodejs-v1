import { upperCaseTextSchema } from '@schemas/utils/uppercase-text-schema'
import z from 'zod'

export const getAllUsersSimplifiedQuerySchema = z.object({

  fullName: upperCaseTextSchema.optional(),
  institutionName: upperCaseTextSchema.optional(),
  state: upperCaseTextSchema.optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

export type GetAllUsersSimplifiedQuerySchemaType = z.infer<
  typeof getAllUsersSimplifiedQuerySchema
>
