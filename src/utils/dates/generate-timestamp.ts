import dayjs from 'dayjs'

export function generateTimestamp(date: Date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD')
}
