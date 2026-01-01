import type { Prisma } from '@prisma/client'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { guestMeetingEnrollmentDataArray1, guestMeetingEnrollmentDataArray2 } from './meeting-guests'
import { meetingPresentationNestedMeetingEnrollmentDataArray1 } from './meeting-presentations'

export const meetingEnrollmentDataArray1: Prisma.MeetingEnrollmentCreateWithoutMeetingInput[] = [
  ...guestMeetingEnrollmentDataArray1,
  ...guestMeetingEnrollmentDataArray2,
].map((guestInfo) => ({
  MeetingPresentation: getRandomArrayElement(meetingPresentationNestedMeetingEnrollmentDataArray1),
  GuestDetails: guestInfo,
}))
