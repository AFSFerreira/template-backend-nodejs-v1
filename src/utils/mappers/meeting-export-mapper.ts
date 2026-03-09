// src/presenters/meeting-enrollment-presenter.ts

import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { booleanToPtLabel } from '@utils/formatters/boolean-to-pt-label'
import { formatPresentationType } from '@utils/formatters/presentation-type-label'
import { mapEducationLevel } from '@utils/mappers/map-education-level'
import dayjs from 'dayjs'

/**
 * Mapeia uma inscrição de encontro (com detalhes completos) para um objeto plano
 * adequado à exportação em CSV/Excel.
 *
 * Unifica dados de usuários cadastrados (`UserDetails`) e convidados (`GuestDetails`)
 * em um formato normalizado, aplicando formatações de data, tradução de enums e
 * concatenação de autores/afiliações separados por `;`.
 *
 * @param meetingEnrollment - Inscrição de encontro com relacionamentos carregados.
 * @param targetTimezone - Fuso horário para formatação de datas (padrão: `SYSTEM_TIMEZONE`).
 * @returns Objeto plano com campos formatados para exportação.
 */
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

  const wantsNewsletter = booleanToPtLabel(
    meetingEnrollment.UserDetails?.User.wantsNewsletter ?? meetingEnrollment.GuestDetails?.wantsNewsletter,
  )

  const hasPresentation = booleanToPtLabel(!!meetingEnrollment.MeetingPresentation)

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
