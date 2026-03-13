import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { Keyword } from '@prisma/generated/client'
import type { JSONContent } from '@tiptap/core'
import { SYSTEM_TIMEZONE } from '@constants/timezone-constants'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { getProseMirrorText } from '@utils/extractors/get-prose-mirror-text'
import { booleanToPtLabel } from '@utils/formatters/boolean-to-pt-label'
import { mapEducationLevel } from '@utils/mappers/map-education-level'
import { mapIdentityType } from '@utils/mappers/map-identity-type'
import { mapMembershipStatus } from '@utils/mappers/map-membership-status'
import { mapOccupation } from '@utils/mappers/map-occupation'
import dayjs from 'dayjs'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserExportMapperService {
  constructor(
    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,

    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  map(user: UserWithDetails, targetTimezone: string = SYSTEM_TIMEZONE) {
    const profile = user.ResearcherProfile

    // Dados pessoais:
    const fullName = user.fullName
    const username = user.username
    const email = user.email
    const birthDate = dayjs(user.birthdate).tz(targetTimezone).format('YYYY-MM-DD')
    const identityType = mapIdentityType(user.identityType)
    const identityDocument = user.identityDocument

    // Dados profissionais/acadêmicos:
    const institutionName = profile?.Institution?.name ?? ''
    const departmentName = profile?.departmentName ?? ''
    const occupation = mapOccupation(profile?.occupation)
    const educationLevel = mapEducationLevel(user.educationLevel)
    const activityAreaDescription = profile?.activityAreaDescription ?? ''
    const subActivityAreaDescription = profile?.subActivityAreaDescription ?? ''
    const interestDescription = user.interestDescription
    const astrobiologyOrRelatedStartYear = user.astrobiologyOrRelatedStartYear
    const mainAreaActivity = profile?.ActivityArea?.area ?? ''

    // Dados de associação e preferências:
    const membershipStatus = mapMembershipStatus(user.membershipStatus)
    const publicInformation = profile?.publicInformation
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
    const courseName = profile?.EnrolledCourse?.courseName ?? ''
    const startGraduationDate = profile?.EnrolledCourse?.startGraduationDate
      ? dayjs(profile.EnrolledCourse.startGraduationDate).tz(targetTimezone).format('YYYY-MM')
      : ''
    const expectedGraduationDate = profile?.EnrolledCourse?.expectedGraduationDate
      ? dayjs(profile.EnrolledCourse.expectedGraduationDate).tz(targetTimezone).format('YYYY-MM')
      : ''
    const supervisorName = profile?.EnrolledCourse?.supervisorName ?? ''
    const scholarshipHolder = profile?.EnrolledCourse?.scholarshipHolder ?? false
    const sponsoringOrganization = profile?.EnrolledCourse?.sponsoringOrganization ?? ''

    // Áreas de atuação:
    const activityArea = profile?.ActivityArea?.area ?? ''
    const subActivityArea = profile?.SubActivityArea?.area ?? ''

    // Palavras-chave e publicações:
    const keywords =
      profile?.Keyword?.map((k: Keyword) => k.value)
        .filter(Boolean)
        .join('; ') ?? ''

    const publications =
      profile?.AcademicPublication?.map((p) => `${p.title} (${p.publicationYear.toString()})`).join(' | ') ?? ''

    // Diretoria:
    const directorBoardProfileImage = user.DirectorBoard?.profileImage
      ? this.directorBoardUrlBuilderService.buildProfileImageUrl(user.DirectorBoard?.profileImage)
      : this.userUrlBuilderService.buildProfileImageUrl(user.profileImage)

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
}
