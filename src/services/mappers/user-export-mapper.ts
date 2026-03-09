import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { Keyword } from '@prisma/generated/client'
import type { JSONContent } from '@tiptap/core'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { getProseMirrorText } from '@utils/extractors/get-prose-mirror-text'
import { booleanToPtLabel } from '@utils/formatters/boolean-to-pt-label'
import { mapEducationLevel } from '@utils/mappers/map-education-level'
import { mapIdentityType } from '@utils/mappers/map-identity-type'
import { mapMembershipStatus } from '@utils/mappers/map-membership-status'
import { mapOccupation } from '@utils/mappers/map-occupation'
import dayjs from 'dayjs'

/**
 * Mapeia um usuário com todos os seus relacionamentos para um objeto plano
 * adequado à exportação em CSV/Excel.
 *
 * Transforma campos de:
 * - Dados pessoais (nome, documento, nascimento)
 * - Dados profissionais/acadêmicos (instituição, curso, área)
 * - Associação e preferências (status, newsletter, email público)
 * - Endereço completo
 * - Curso/graduação vinculada
 * - Palavras-chave e publicações acadêmicas
 * - Diretoria (cargo, foto, "sobre mim")
 *
 * @param user - Usuário com relacionamentos carregados.
 * @param targetTimezone - Timezone para formatação de datas (padrão: `SYSTEM_TIMEZONE`).
 * @returns Objeto plano com todos os campos formatados para exportação.
 */
export function userExportMapper(user: UserWithDetails, targetTimezone: string = SYSTEM_TIMEZONE) {
  // Dados pessoais:
  const fullName = user.fullName
  const username = user.username
  const email = user.email
  const birthDate = dayjs(user.birthdate).tz(targetTimezone).format('YYYY-MM-DD')
  const identityType = mapIdentityType(user.identityType)
  const identityDocument = user.identityDocument

  // Dados profissionais/acadêmicos:
  const institutionName = user.Institution?.name ?? ''
  const departmentName = user.departmentName ?? ''
  const occupation = mapOccupation(user.occupation)
  const educationLevel = mapEducationLevel(user.educationLevel)
  const activityAreaDescription = user.activityAreaDescription ?? ''
  const subActivityAreaDescription = user.subActivityAreaDescription ?? ''
  const interestDescription = user.interestDescription
  const astrobiologyOrRelatedStartYear = user.astrobiologyOrRelatedStartYear
  const mainAreaActivity = user.ActivityArea?.area ?? ''

  // Dados de associação e preferências:
  const membershipStatus = mapMembershipStatus(user.membershipStatus)
  const publicInformation = user.publicInformation
  const emailIsPublic = booleanToPtLabel(user.emailIsPublic)
  const receiveReports = booleanToPtLabel(user.receiveReports)

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

  // Áreas de atuação:
  const activityArea = user.ActivityArea?.area ?? ''
  const subActivityArea = user.SubActivityArea?.area ?? ''

  // Palavras-chave e publicações:
  const keywords =
    user.Keyword?.map((k: Keyword) => k.value)
      .filter(Boolean)
      .join('; ') ?? ''

  const publications =
    user.AcademicPublication?.map((p) => `${p.title} (${p.publicationYear.toString()})`).join(' | ') ?? ''

  // Diretoria:
  const directorBoardProfileImage = user.DirectorBoard?.profileImage
    ? buildDirectorBoardProfileImageUrl(user.DirectorBoard?.profileImage)
    : buildUserProfileImageUrl(user.profileImage)

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
    activityArea,
    activityAreaDescription,
    subActivityArea,
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
