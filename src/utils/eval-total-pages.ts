interface EvalTotalPagesQuery {
  pageSize: number
  totalItems: number
}

export function evalTotalPages({ pageSize, totalItems }: EvalTotalPagesQuery) {
  return Math.ceil(totalItems / pageSize)
}
