import type { IPaginateArray } from '@custom-types/utils/pagination/paginate-array'

export function paginateArray<T>({ array, page = 1, limit = 10 }: IPaginateArray<T>): T[] {
  const totalItems = array.length
  const totalPages = Math.max(1, Math.ceil(totalItems / limit))

  const currentPage = Math.min(Math.max(1, page), totalPages)

  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit

  const data = array.slice(startIndex, endIndex)

  return data
}
