import type { Prisma } from '@prisma/client'
import { EducationLevelType, OccupationType } from '@prisma/client'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { usersDataArray2 } from './users'

const meetingGuestsParticipantsDummyDataArray1: Prisma.MeetingParticipationCreateWithoutMeetingInput[] = []

for (let i = 1; i <= 50; i++) {
  meetingGuestsParticipantsDummyDataArray1.push({
    Guest: {
      create: {
        email: `random-meeting-guest-${i}@email.com`,
        departmentName: `Departamento ${i}`,
        educationLevel: getRandomArrayElement(Object.values(EducationLevelType)),
        fullName: `Random User ${i}`,
        institutionName: `Instituição Fictícia N° ${i}`,
        occupation: getRandomArrayElement(Object.values(OccupationType)),
        wantsNewsletter: getRandomArrayElement([true, false]),
      },
    },
  })
}

const meetingUsersParticipantsDummyDataArray1: Prisma.MeetingParticipationCreateWithoutMeetingInput[] = []

for (const user of usersDataArray2) {
  meetingGuestsParticipantsDummyDataArray1.push({
    User: {
      connect: { email: user.email },
    },
  })
}

export const meetingParticipantsDummyDataArray1: Prisma.MeetingParticipationCreateWithoutMeetingInput[] = [
  ...meetingGuestsParticipantsDummyDataArray1,
  ...meetingUsersParticipantsDummyDataArray1,
]
