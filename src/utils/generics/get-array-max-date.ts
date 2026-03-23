/**
 * Retorna a data mais recente (maior) de um array de datas.
 *
 * Compara os timestamps em milissegundos e retorna um novo objeto `Date`
 * correspondente ao valor máximo.
 *
 * @param dates - Array de objetos `Date` (deve conter pelo menos um elemento).
 * @returns Nova instância de `Date` representando a data mais recente.
 *
 * @example
 * getArrayMaxDate([new Date('2026-01-01'), new Date('2026-06-15'), new Date('2026-03-08')])
 * // Date('2026-06-15')
 */
export function getArrayMaxDate(dates: Date[]) {
  return new Date(Math.max(...dates.map((date) => date.getTime())))
}
