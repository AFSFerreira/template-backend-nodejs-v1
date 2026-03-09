import type { exportFormatEnumSchema } from '@lib/zod/utils/enums/export-format-enum-schema'
import type { z } from 'zod'

export type ExportFormat = z.infer<typeof exportFormatEnumSchema>
