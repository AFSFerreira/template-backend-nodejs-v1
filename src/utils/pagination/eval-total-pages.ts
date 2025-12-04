import type { IEvalTotalPages } from '@custom-types/utils/pagination/eval-total-pages'

export function evalTotalPages({ pageSize, totalItems }: IEvalTotalPages) {
  return Math.ceil(totalItems / pageSize)
}
