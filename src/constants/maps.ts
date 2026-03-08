export const EXTENSION_TO_MIME_MAP = new Map<string, string>([
  ['jpg', 'image/jpg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
  ['webp', 'image/webp'],
  ['pdf', 'application/pdf'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  ['csv', 'text/csv'],
])

export const MIME_TO_EXTENSION_MAP = new Map<string, string>(
  Array.from(EXTENSION_TO_MIME_MAP, ([ext, mime]) => [mime, ext]),
)

export const OPERATION_TO_SYMBOL_MAP = new Map<string, string>([
  ['equals', '='],
  ['lt', '<'],
  ['lte', '<='],
  ['gt', '>'],
  ['gte', '>='],
])
