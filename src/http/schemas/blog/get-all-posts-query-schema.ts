import { LONG_LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { subCategoriesSchema } from '@schemas/utils/components/sub-categories-schema'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

const getAllPostsQueryRawSchema = z
  .object({
    searchContent: nonemptyTextSchema.max(LONG_LIMITED_CHARACTERS_SIZE),
    authorId: uuidv7Schema,
    subCategories: subCategoriesSchema,
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        accessCountOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllPostsQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
      ...(query.accessCountOrder ? { accessCountOrder: query.accessCountOrder } : {}),
    },
  }),
  getAllPostsQueryRawSchema,
)

export type GetAllPostsQuerySchemaType = z.infer<typeof getAllPostsQuerySchema>
