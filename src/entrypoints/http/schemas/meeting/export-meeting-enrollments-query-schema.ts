import { exportFormatEnumSchema } from '@lib/zod/utils/enums/export-format-enum-schema'
import { z } from 'zod'

export const exportMeetingEnrollmentsQuerySchema = z.object({
  format: exportFormatEnumSchema,
})
