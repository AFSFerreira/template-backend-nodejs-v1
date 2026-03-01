import { EXPORT_FILE_FORMATS } from '@constants/static-file-constants'
import z from 'zod'

export const exportFormatEnumSchema = z.enum(EXPORT_FILE_FORMATS).default('excel')

export type ExportFormat = z.infer<typeof exportFormatEnumSchema>
