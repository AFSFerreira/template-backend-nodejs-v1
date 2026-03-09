import { toDateOnlyUTC } from '@utils/formatters/to-date-only'

/**
 * Cria um mapa de filtros de status de encontros baseado na data atual.
 *
 * Utilizado para converter filtros de status legíveis (`ALL`, `PENDING`, `FINISHED`)
 * em condições de data compatíveis com queries Prisma (`gte`, `lt`).
 *
 * - `ALL`: sem filtro de data.
 * - `PENDING`: encontros com data final >= hoje.
 * - `FINISHED`: encontros com data final < hoje.
 *
 * @returns Mapa de `string` para filtro Prisma de data.
 *
 * @example
 * const map = getStatusFilterMap()
 * map.get('PENDING')  // { gte: Date('2026-03-08T00:00:00.000Z') }
 * map.get('FINISHED') // { lt: Date('2026-03-08T00:00:00.000Z') }
 * map.get('ALL')      // undefined
 */
export function getStatusFilterMap() {
  const today = toDateOnlyUTC(new Date())

  return new Map<string, Record<string, Date> | undefined>([
    ['ALL', undefined],
    ['PENDING', { gte: today }],
    ['FINISHED', { lt: today }],
  ])
}
