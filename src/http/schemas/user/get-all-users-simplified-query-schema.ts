import { paginatedSchema } from '@schemas/utils/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/uppercase-text-schema'
import z from 'zod'

export const getAllUsersSimplifiedQuerySchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
  })
  .extend(paginatedSchema.shape)
  .partial()

export type GetAllUsersSimplifiedQuerySchemaType = z.infer<
  typeof getAllUsersSimplifiedQuerySchema
>
