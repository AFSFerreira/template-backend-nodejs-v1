import { STATUS_FILTER_MAP } from '@constants/mappers'

export function mapMeetingStatusToDateFilter(status: string) {
  return STATUS_FILTER_MAP.get(status)
}
