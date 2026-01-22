import type { Meeting } from '@prisma/client'

export interface MeetingDefaultPresenterInput extends Meeting {}

export interface HTTPMeeting {
  id: string
  title: string
  bannerImage: string
  description: string
  lastDate: Date
}
