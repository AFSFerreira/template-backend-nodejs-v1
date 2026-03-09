import type { PaginationType } from '@custom-types/utils/generics/pagination'

/**
 * Calcula o offset de paginação com base na página e limite informados.
 *
 * Utilizado para converter parâmetros de página (1-indexed) em offset
 * para queries SQL/Prisma com `skip` e `take`.
 *
 * @param params - Parâmetros de paginação.
 * @param params.page - Número da página (padrão: 1).
 * @param params.limit - Quantidade de itens por página (padrão: 10).
 * @returns Objeto com `page`, `limit` e `offset` calculado.
 *
 * @example
 * evalOffset({ page: 1, limit: 10 })  // { page: 1, limit: 10, offset: 0 }
 * evalOffset({ page: 3, limit: 20 })  // { page: 3, limit: 20, offset: 40 }
 * evalOffset({})                      // { page: 1, limit: 10, offset: 0 }
 */
export function evalOffset({ page = 1, limit = 10 }: PaginationType) {
  const offset = (page - 1) * limit
  return { page, limit, offset }
}
