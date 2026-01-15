import type { PaginationType } from '@custom-types/utils/generics/pagination'

export function evalOffset({ page = 1, limit = 10 }: PaginationType) {
  const offset = (page - 1) * limit
  return { page, limit, offset }
}
