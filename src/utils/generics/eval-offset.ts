import type { PaginationType } from '@custom-types/utils/generics/pagination'

/**
 * Calcula o offset de paginação com base na página e limite informados.
 *
 * Utilizado para converter parâmetros de página (1-indexed) em offset
 * para queries SQL/Prisma com `skip` e `take`.
 *
 * @param params - Parâmetros de paginação.
 * @param params.currentPage - Número da página (padrão: 1).
 * @param params.pageSize - Quantidade de itens por página (padrão: 10).
 * @returns Objeto com `take` (limite) e `skip` (offset) calculado.
 *
 * @example
 * evalOffset({ currentPage: 1, pageSize: 10 })  // { take: 10, skip: 0 }
 * evalOffset({ currentPage: 3, pageSize: 20 })  // { take: 20, skip: 40 }
 * evalOffset({})                      // { take: 10, skip: 0 }
 */
export function evalOffset({ currentPage = 1, pageSize = 10 }: PaginationType) {
  const offset = (currentPage - 1) * pageSize
  return { take: pageSize, skip: offset }
}
