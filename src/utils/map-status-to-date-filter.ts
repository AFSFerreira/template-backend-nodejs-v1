export function mapMeetingStatusToDateFilter(status: string) {
  switch (status) {
    case 'ALL':
      return undefined
    case 'PENDING':
      return { gte: new Date() }
    case 'FINISHED':
      return { lte: new Date() }
    default:
      return undefined
  }
}
