import type { IEvalTotalPages } from '@custom-types/utils/pagination/eval-total-pages'

/**
 * Calcula o número total de páginas necessárias para exibir todos os itens.
 *
 * Arredonda para cima (`Math.ceil`) para garantir que o último grupo parcial
 * de itens tenha sua própria página.
 *
 * @param params - Parâmetros para cálculo.
 * @param params.pageSize - Quantidade de itens por página.
 * @param params.totalItems - Quantidade total de itens.
 * @returns Número total de páginas.
 *
 * @example
 * evalTotalPages({ pageSize: 10, totalItems: 25 })  // 3
 * evalTotalPages({ pageSize: 10, totalItems: 20 })  // 2
 * evalTotalPages({ pageSize: 10, totalItems: 0 })   // 0
 */
export function evalTotalPages({ pageSize, totalItems }: IEvalTotalPages) {
  return Math.ceil(totalItems / pageSize)
}
