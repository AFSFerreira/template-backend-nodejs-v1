import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import type { HTTPMeeting } from './meeting-default'

export interface MeetingDetailedPresenterInput extends MeetingWithDetails {}

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
  agenda: string
  location: string
  meetingPaymentInfo?: HTTPMeetingPaymentInfo
  meetingDates: Date[]
}
