export const MIME_TO_EXTENSION_MAP = new Map<string, string>([
  ['image/jpg', 'jpg'],
  ['image/jpeg', 'jpeg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['application/pdf', 'pdf'],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
])

export const EXTENSION_TO_MIME_MAP = new Map<string, string>([
  ['jpg', 'image/jpg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
  ['webp', 'image/webp'],
  ['pdf', 'application/pdf'],
  ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
])

export const OPERATION_TO_SYMBOL_MAP = new Map<string, string>([
  ['equals', '='],
  ['lt', '<'],
  ['lte', '<='],
  ['gt', '>'],
  ['gte', '>='],
])

export function getStatusFilterMap() {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for consistent filtering

  return new Map<string, Record<string, Date> | undefined>([
    ['ALL', undefined],
    ['PENDING', { gte: today }],
    ['FINISHED', { lt: today }], // Use 'lt' instead of 'lte' to only get truly finished meetings
  ])
}
