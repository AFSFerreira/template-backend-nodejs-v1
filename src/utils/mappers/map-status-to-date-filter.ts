import { getStatusFilterMap } from '@constants/maps'

export function mapMeetingStatusToDateFilter(status: string | undefined) {
  const STATUS_FILTER_MAP = getStatusFilterMap()
  return status ? STATUS_FILTER_MAP.get(status) : undefined
}
