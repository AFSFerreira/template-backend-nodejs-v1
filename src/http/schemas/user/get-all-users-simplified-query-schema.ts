import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllUsersSimplifiedQuerySchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
  })
  .partial()
  .extend(paginatedSchema.shape)

export type GetAllUsersSimplifiedQuerySchemaType = z.infer<typeof getAllUsersSimplifiedQuerySchema>
