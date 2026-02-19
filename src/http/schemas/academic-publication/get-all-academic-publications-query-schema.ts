import { LONG_LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { comparableEnumSchema } from '@lib/zod/utils/enums/comparable-enum-schema'
import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { rangedYearSchema } from '@lib/zod/utils/primitives/ranged-year-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
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
  (query: Record<string, unknown>) => ({
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
