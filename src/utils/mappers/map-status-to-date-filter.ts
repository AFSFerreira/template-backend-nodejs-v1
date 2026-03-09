import { getStatusFilterMap } from './get-status-filter-map'

/**
 * Converte um status de encontro em filtro de data Prisma.
 *
 * Wrapper sobre `getStatusFilterMap` que aceita `undefined` como input,
 * retornando `undefined` nesse caso (sem filtro).
 *
 * @param status - Status do encontro (`'ALL'`, `'PENDING'`, `'FINISHED'`) ou `undefined`.
 * @returns Filtro Prisma de data (`{ gte: Date }` ou `{ lt: Date }`), ou `undefined`.
 *
 * @example
 * mapMeetingStatusToDateFilter('PENDING')   // { gte: Date }
 * mapMeetingStatusToDateFilter(undefined)   // undefined
 */
export function mapMeetingStatusToDateFilter(status: string | undefined) {
  const STATUS_FILTER_MAP = getStatusFilterMap()
  return status ? STATUS_FILTER_MAP.get(status) : undefined
}
