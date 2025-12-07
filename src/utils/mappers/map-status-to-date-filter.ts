import { STATUS_FILTER_MAP } from '@constants/mappers'

export function mapMeetingStatusToDateFilter(status: string | undefined) {
  return status ? STATUS_FILTER_MAP.get(status) : undefined
}
