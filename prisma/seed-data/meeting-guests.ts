import type { Prisma } from '@prisma/generated/client'
import { EducationLevelType, OccupationType } from '@prisma/generated/enums'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'

export const guestMeetingEnrollmentData1: Prisma.GuestMeetingEnrollmentCreateNestedOneWithoutMeetingEnrollmentInput = {
  create: {
    fullName: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@email.com',
    institutionName: 'Universidade Federal de Minas Gerais',
    departmentName: 'Departamento de Física',
    occupation: OccupationType.PROFESSOR,
    educationLevel: EducationLevelType.DOCTORATE,
    wantsNewsletter: true,
  },
}

export const guestMeetingEnrollmentData2: Prisma.GuestMeetingEnrollmentCreateNestedOneWithoutMeetingEnrollmentInput = {
  create: {
    fullName: 'Mariana Souza Lima',
    email: 'mariana.lima@email.com',
    institutionName: 'Instituto de Astronomia USP',
    departmentName: 'Departamento de Astronomia',
    occupation: OccupationType.POSTGRADUATE,
    educationLevel: EducationLevelType.MASTER_STUDENT,
    wantsNewsletter: true,
  },
}

export const guestMeetingEnrollmentData3: Prisma.GuestMeetingEnrollmentCreateNestedOneWithoutMeetingEnrollmentInput = {
  create: {
    fullName: 'Rafael Oliveira Santos',
    email: 'rafael.santos@email.com',
    institutionName: 'Observatório Nacional',
    departmentName: 'Divisão de Astrofísica',
    occupation: OccupationType.RESEARCHER,
    educationLevel: EducationLevelType.POST_DOCTORATE,
    wantsNewsletter: false,
  },
}

export const guestMeetingEnrollmentDataArray1: Prisma.GuestMeetingEnrollmentCreateNestedOneWithoutMeetingEnrollmentInput[] =
  [guestMeetingEnrollmentData1, guestMeetingEnrollmentData2, guestMeetingEnrollmentData3]

export const guestMeetingEnrollmentDataArray2: Prisma.GuestMeetingEnrollmentCreateNestedOneWithoutMeetingEnrollmentInput[] =
  []

for (let i = 1; i <= 700; i++) {
  guestMeetingEnrollmentDataArray2.push({
    create: {
      email: `random-meeting-guest-${i}@email.com`,
      departmentName: `Departamento ${i}`,
      educationLevel: getRandomArrayElement(Object.values(EducationLevelType)),
      fullName: `Convidado Aleatório ${i}`,
      institutionName: `Instituição Fictícia N° ${i}`,
      occupation: getRandomArrayElement(Object.values(OccupationType)),
      wantsNewsletter: getRandomArrayElement([true, false]),
    },
  })
}
