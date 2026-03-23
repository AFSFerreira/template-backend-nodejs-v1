import type { IPaginateArray } from '@custom-types/utils/pagination/paginate-array'

/**
 * Pagina um array em memória, retornando apenas os itens da página solicitada.
 *
 * Garante que a página solicitada esteja dentro dos limites válidos (clamp entre 1 e
 * o total de páginas). Útil para paginação de dados já carregados em memória, como
 * resultados combinados de múltiplas fontes.
 *
 * @typeParam T - Tipo dos elementos do array.
 * @param params - Parâmetros de paginação.
 * @param params.array - Array completo a ser paginado.
 * @param params.page - Número da página (1-indexed, padrão: 1).
 * @param params.limit - Itens por página (padrão: 10).
 * @returns Subarray correspondente à página solicitada.
 *
 * @example
 * paginateArray({ array: [1, 2, 3, 4, 5], page: 1, limit: 2 }) // [1, 2]
 * paginateArray({ array: [1, 2, 3, 4, 5], page: 2, limit: 2 }) // [3, 4]
 * paginateArray({ array: [1, 2, 3, 4, 5], page: 3, limit: 2 }) // [5]
 */
export function paginateArray<T>({ array, page = 1, limit = 10 }: IPaginateArray<T>): T[] {
  const totalItems = array.length
  const totalPages = Math.max(1, Math.ceil(totalItems / limit))

  const currentPage = Math.min(Math.max(1, page), totalPages)

  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit

  const data = array.slice(startIndex, endIndex)

  return data
}
