// src/presenters/meeting-enrollment-presenter.ts

import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { formatPresentationType } from '@utils/formatters/presentation-type-label'
import { mapEducationLevel } from '@utils/mappers/map-education-level'
import dayjs from 'dayjs'

export function meetingExportMapper(
  meetingEnrollment: MeetingEnrollmentWithDetails,
  targetTimezone: string = SYSTEM_TIMEZONE,
) {
  const name = meetingEnrollment.UserDetails?.User.fullName || meetingEnrollment.GuestDetails?.fullName || ''

  const email = meetingEnrollment.UserDetails?.User.email || meetingEnrollment.GuestDetails?.email || ''

  const createdAt = dayjs(meetingEnrollment.createdAt).tz(targetTimezone).format('DD/MM/YYYY HH:mm')

  const institutionName =
    meetingEnrollment.UserDetails?.User.Institution?.name || meetingEnrollment.GuestDetails?.institutionName || ''

  const departmentName =
    meetingEnrollment.UserDetails?.User.departmentName || meetingEnrollment.GuestDetails?.departmentName || ''

  const educationLevel = mapEducationLevel(
    meetingEnrollment.UserDetails?.User.educationLevel ?? meetingEnrollment.GuestDetails?.educationLevel,
  )

  const wantsNewsletter = (
    meetingEnrollment.UserDetails?.User.wantsNewsletter !== undefined
      ? meetingEnrollment.UserDetails?.User.wantsNewsletter
      : meetingEnrollment.GuestDetails?.wantsNewsletter
  )
    ? 'sim'
    : 'não'

  const hasPresentation = !!meetingEnrollment.MeetingPresentation ? 'sim' : 'não'

  const presentationType = formatPresentationType(meetingEnrollment.MeetingPresentation?.presentationType)

  const title = meetingEnrollment.MeetingPresentation?.title || ''

  const description = meetingEnrollment.MeetingPresentation?.description || ''

  const affiliations =
    meetingEnrollment.MeetingPresentation?.Affiliations.map((affiliation) => affiliation.name).join('; ') || ''

  const authors = meetingEnrollment.MeetingPresentation?.Authors.map((author) => author.name).join('; ') || ''

  return {
    name,
    email,
    createdAt,
    institutionName,
    departmentName,
    educationLevel,
    wantsNewsletter,
    hasPresentation,
    presentationType,
    title,
    description,
    affiliations,
    authors,
  }
}
