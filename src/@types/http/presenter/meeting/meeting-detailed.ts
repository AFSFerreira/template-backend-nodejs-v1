import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface MeetingDetailedPresenterInput extends MeetingWithDetails {}

interface HTTPMeetingPaymentInfo {
  code: string
  pixKey: string
  bank: string
  agency: string
  account: string
  billingEmail: string
  value: string
  limitDate: Date
}

export interface HTTPMeetingWithDetails {
  id: string
  title: string
  bannerImage: string
  description: string
  lastDate: Date
  agenda: string
  location: string
  meetingPaymentInfo?: HTTPMeetingPaymentInfo
  meetingDates: Date[]
}
