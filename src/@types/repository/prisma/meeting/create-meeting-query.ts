export interface CreateMeetingQuery {
  title: string
  bannerImage: string
  agenda: string
  description: string
  location: string
  lastDate: Date
  dates: Date[]
  paymentInfo: {
    value: number
    limitDate: Date
  }
}
