import { LONG_LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { comparableEnumSchema } from '@schemas/utils/enums/comparable-enum-schema'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { rangedYearSchema } from '@schemas/utils/primitives/ranged-year-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

const getAllAcademicPublicationsQueryRawSchema = z
  .object({
    title: nonemptyTextSchema.max(LONG_LIMITED_CHARACTERS_SIZE),
    mainCategory: upperCaseTextSchema,
    publicationYear: z.object({
      year: rangedYearSchema,
      publicationYearComparisonOrder: comparableEnumSchema.default('equals'),
    }),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllAcademicPublicationsQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    publicationYear: query.publicationYear
      ? { year: query.publicationYear, publicationYearComparisonOrder: query.publicationYearComparisonOrder }
      : undefined,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
    },
  }),
  getAllAcademicPublicationsQueryRawSchema,
)

export type GetAllAcademicPublicationsQuerySchemaType = z.infer<typeof getAllAcademicPublicationsQuerySchema>
