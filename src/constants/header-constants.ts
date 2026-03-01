import type { CustomHttpHeader } from '@custom-types/custom/http-header'
import type { EXPORT_FILE_FORMATS } from './static-file-constants'

export const HTML_HEADER = 'text/html; charset=utf-8'

export const EXCEL_CONTENT_TYPE_HEADER = {
  key: 'content-type',
  value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const satisfies CustomHttpHeader

export const CSV_CONTENT_TYPE_HEADER = {
  key: 'content-type',
  value: 'text/csv; charset=utf-8',
} as const satisfies CustomHttpHeader

export const EXPORT_CONTENT_TYPE_HEADERS = {
  excel: EXCEL_CONTENT_TYPE_HEADER,
  csv: CSV_CONTENT_TYPE_HEADER,
} as const satisfies Record<(typeof EXPORT_FILE_FORMATS)[number], CustomHttpHeader>
