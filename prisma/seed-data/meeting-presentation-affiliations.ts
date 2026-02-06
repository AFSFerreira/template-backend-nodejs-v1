import type { Prisma } from '@prisma/generated/client'

export const meetingPresentationAffiliationsData1: Prisma.MeetingPresentationAffiliationCreateWithoutPresentationInput[] =
  [{ name: 'Universidade de São Paulo (USP)' }, { name: 'Instituto Nacional de Pesquisas Espaciais (INPE)' }]

export const meetingPresentationAffiliationsData2: Prisma.MeetingPresentationAffiliationCreateWithoutPresentationInput[] =
  [{ name: 'Universidade Federal do Rio de Janeiro (UFRJ)' }, { name: 'Observatório Nacional' }]

export const meetingPresentationAffiliationsData3: Prisma.MeetingPresentationAffiliationCreateWithoutPresentationInput[] =
  [
    { name: 'Universidade Estadual de Campinas (UNICAMP)' },
    { name: 'Laboratório Nacional de Astrofísica (LNA)' },
    { name: 'Centro Brasileiro de Pesquisas Físicas (CBPF)' },
  ]

export const meetingPresentationAffiliationsDataArray1: Prisma.MeetingPresentationAffiliationCreateWithoutPresentationInput[][] =
  [meetingPresentationAffiliationsData1, meetingPresentationAffiliationsData2, meetingPresentationAffiliationsData3]
