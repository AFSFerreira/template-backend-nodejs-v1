import type { MeetingEnrollment } from '@prisma/client'

export interface MeetingEnrollmentDefaultPresenterInput extends MeetingEnrollment {}

export interface HTTPMeetingEnrollment {
  id: string
  meetingId: number
  createdAt: Date
}
