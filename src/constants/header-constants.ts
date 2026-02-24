import type { CustomHttpHeader } from '@custom-types/custom/http-header'

export const HTML_HEADER = 'text/html; charset=utf-8'

export const EXCEL_CONTENT_TYPE_HEADER = {
  key: 'content-type',
  value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
} as const satisfies CustomHttpHeader
