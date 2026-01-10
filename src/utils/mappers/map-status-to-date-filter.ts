import { getStatusFilterMap } from "./get-status-filter-map"

export function mapMeetingStatusToDateFilter(status: string | undefined) {
  const STATUS_FILTER_MAP = getStatusFilterMap()
  return status ? STATUS_FILTER_MAP.get(status) : undefined
}
