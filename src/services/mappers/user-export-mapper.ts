import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { Keyword } from '@prisma/generated/client'
import type { JSONContent } from '@tiptap/core'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'
import dayjs from 'dayjs'

export function userExportMapper(user: UserWithDetails, targetTimezone: string = SYSTEM_TIMEZONE) {
  // Dados pessoais:
  const fullName = user.fullName
  const username = user.username
  const email = user.email
  const birthDate = dayjs(user.birthdate).tz(targetTimezone).format('YYYY-MM-DD')
  const identityType = user.identityType
  const identityDocument = user.identityDocument

  // Dados profissionais/acadêmicos:
  const institutionName = user.Institution?.name ?? ''
  const departmentName = user.departmentName ?? ''
  const occupation = user.occupation
  const educationLevel = user.educationLevel
  const activityAreaDescription = user.activityAreaDescription ?? ''
  const subActivityAreaDescription = user.subActivityAreaDescription ?? ''
  const interestDescription = user.interestDescription
  const astrobiologyOrRelatedStartYear = user.astrobiologyOrRelatedStartYear
  const mainAreaActivity = user.ActivityArea?.area ?? ''

  // Dados de associação e preferências:
  const membershipStatus = user.membershipStatus
  const publicInformation = user.publicInformation
  const emailIsPublic = user.emailIsPublic
  const receiveReports = user.receiveReports

  // Timestamps:
  const lastLogin = user.lastLogin ? dayjs(user.lastLogin).tz(targetTimezone).format('DD/MM/YYYY HH:mm') : ''
  const createdAt = dayjs(user.createdAt).tz(targetTimezone).format('DD/MM/YYYY HH:mm')
  const updatedAt = dayjs(user.updatedAt).tz(targetTimezone).format('DD/MM/YYYY HH:mm')

  // Endereço:
  const zip = user.Address?.zip ?? ''
  const number = user.Address?.number ?? ''
  const street = user.Address?.street ?? ''
  const district = user.Address?.district ?? ''
  const city = user.Address?.city ?? ''
  const state = user.Address?.State?.name ?? ''
  const country = user.Address?.State?.Country?.name ?? ''
  const complement = user.Address?.complement ?? ''

  // Curso:
  const courseName = user.EnrolledCourse?.courseName ?? ''
  const startGraduationDate = user.EnrolledCourse?.startGraduationDate
    ? dayjs(user.EnrolledCourse.startGraduationDate).tz(targetTimezone).format('YYYY-MM')
    : ''
  const expectedGraduationDate = user.EnrolledCourse?.expectedGraduationDate
    ? dayjs(user.EnrolledCourse.expectedGraduationDate).tz(targetTimezone).format('YYYY-MM')
    : ''
  const supervisorName = user.EnrolledCourse?.supervisorName ?? ''
  const scholarshipHolder = user.EnrolledCourse?.scholarshipHolder ?? false
  const sponsoringOrganization = user.EnrolledCourse?.sponsoringOrganization ?? ''

  // Palavras-chave e publicações:
  const keywords =
    user.Keyword?.map((k: Keyword) => k.value)
      .filter(Boolean)
      .join('; ') ?? ''

  const publications =
    user.AcademicPublication?.map((p) => `${p.title} (${p.publicationYear.toString()})`).join(' | ') ?? ''

  // Diretoria:
  const directorBoardProfileImage = user.DirectorBoard?.profileImage ?? ''

  const aboutMe = user.DirectorBoard
    ? (getProseMirrorText({
        proseMirror: user.DirectorBoard.aboutMe as JSONContent,
        tiptapConfiguration,
      }) ?? '')
    : ''

  const directorPosition = user.DirectorBoard?.DirectorPosition?.position ?? ''

  return {
    fullName,
    username,
    email,
    birthDate,
    institutionName,
    departmentName,
    occupation,
    educationLevel,
    membershipStatus,
    identityType,
    identityDocument,
    activityAreaDescription,
    subActivityAreaDescription,
    interestDescription,
    publicInformation,
    astrobiologyOrRelatedStartYear,
    emailIsPublic,
    receiveReports,
    lastLogin,
    createdAt,
    updatedAt,
    zip,
    number,
    street,
    district,
    city,
    state,
    country,
    complement,
    mainAreaActivity,
    courseName,
    startGraduationDate,
    expectedGraduationDate,
    supervisorName,
    scholarshipHolder,
    sponsoringOrganization,
    keywords,
    publications,
    directorBoardProfileImage,
    aboutMe,
    directorPosition,
  }
}
