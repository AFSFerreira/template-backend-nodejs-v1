import type { Prisma } from '@prisma/client'

export const meetingPresentationAuthorsData1: Prisma.MeetingPresentationAuthorCreateWithoutPresentationInput[] = [
  { name: 'João Silva' },
  { name: 'Maria Santos' },
  { name: 'Pedro Oliveira' },
]

export const meetingPresentationAuthorsData2: Prisma.MeetingPresentationAuthorCreateWithoutPresentationInput[] = [
  { name: 'Ana Costa' },
  { name: 'Carlos Ferreira' },
]

export const meetingPresentationAuthorsData3: Prisma.MeetingPresentationAuthorCreateWithoutPresentationInput[] = [
  { name: 'Fernanda Lima' },
  { name: 'Roberto Almeida' },
  { name: 'Juliana Martins' },
  { name: 'Lucas Pereira' },
]

export const meetingPresentationAuthorsDataArray1: Prisma.MeetingPresentationAuthorCreateWithoutPresentationInput[][] =
  [meetingPresentationAuthorsData1, meetingPresentationAuthorsData2, meetingPresentationAuthorsData3]
