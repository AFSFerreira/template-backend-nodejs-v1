import type { MeetingEnrollment } from "@prisma/generated/client"

export interface MeetingEnrollmentDefaultPresenterInput extends MeetingEnrollment {}

export interface HTTPMeetingEnrollment {
  id: string
  meetingId: number
  createdAt: Date
}
