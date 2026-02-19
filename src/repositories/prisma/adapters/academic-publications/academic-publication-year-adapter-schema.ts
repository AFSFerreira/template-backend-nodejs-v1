import { integerSchema } from '@lib/zod/utils/primitives/integer-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import z from 'zod'

export const academicPublicationYearAdapterSchema = z
  .object({
    publication_year: positiveIntegerSchema,
    count: integerSchema,
  })
  .transform((raw) => ({
    year: raw.publication_year,
    count: raw.count,
  }))
