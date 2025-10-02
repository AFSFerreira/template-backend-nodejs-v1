import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllUsersSimplifiedQueryRawSchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
    orderBy: z.object({
      fullNameOrder: orderDirectionsSchema,
    })
    .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllUsersSimplifiedQuerySchema = z.preprocess((query: any) => ({
  ...query,
  orderBy: {
    ...(query.fullNameOrder ? { fullNameOrder: query.fullNameOrder } : {})
  }
}), getAllUsersSimplifiedQueryRawSchema)


export type GetAllUsersSimplifiedQuerySchemaType = z.infer<typeof getAllUsersSimplifiedQuerySchema>
