import type { HTTPMeeting } from './meeting-default'

interface HTTPMeetingPaymentInfo {
  code: string
  pixKey: string
  bank: string
  agency: string
  account: string
  value: string
  limitDate: Date
}

export interface HTTPMeetingWithDetails extends HTTPMeeting {
  location: string
  meetingPaymentInfo?: HTTPMeetingPaymentInfo
  meetingDates: Date[]
}
