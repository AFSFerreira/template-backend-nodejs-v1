import type { FlattenedUser } from '@custom-types/services/transformers/flatten-user'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { Keyword } from '@prisma/generated/client'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { getProseMirrorText } from '@services/extractors/get-prose-mirror-text'

export function flattenUser(user: UserWithDetails): FlattenedUser {
  const flattenedUser: FlattenedUser = {
    id: user.publicId,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    birthDate: user.birthdate.toISOString().split('T')[0],
    institutionName: user.Institution?.name ?? '',
    departmentName: user.departmentName ?? '',
    occupation: user.occupation,
    educationLevel: user.educationLevel,
    membershipStatus: user.membershipStatus,
    identityType: user.identityType,
    identityDocument: user.identityDocument,
    activityAreaDescription: user.activityAreaDescription ?? '',
    subActivityAreaDescription: user.subActivityAreaDescription ?? '',
    interestDescription: user.interestDescription,
    publicInformation: user.publicInformation,
    astrobiologyOrRelatedStartYear: user.astrobiologyOrRelatedStartYear,
    emailIsPublic: user.emailIsPublic,
    receiveReports: user.receiveReports,
    lastLogin: user.lastLogin?.toISOString() ?? '',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),

    zip: user.Address?.zip ?? '',
    number: user.Address?.number ?? '',
    street: user.Address?.street ?? '',
    district: user.Address?.district ?? '',
    city: user.Address?.city ?? '',
    state: user.Address?.State?.name ?? '',
    country: user.Address?.State?.Country?.name ?? '',
    complement: user.Address?.complement ?? '',

    mainAreaActivity: user.ActivityArea?.area ?? '',

    courseName: user.EnrolledCourse?.courseName ?? '',
    startGraduationDate: user.EnrolledCourse?.startGraduationDate?.toISOString().slice(0, 7) ?? '',
    expectedGraduationDate: user.EnrolledCourse?.expectedGraduationDate?.toISOString().slice(0, 7) ?? '',
    supervisorName: user.EnrolledCourse?.supervisorName ?? '',
    scholarshipHolder: user.EnrolledCourse?.scholarshipHolder ?? false,
    sponsoringOrganization: user.EnrolledCourse?.sponsoringOrganization ?? '',

    keywords:
      user.Keyword?.map((k: Keyword) => k.value)
        .filter(Boolean)
        .join('; ') ?? '',

    publications:
      user.AcademicPublication?.map((p) => `${p.title} (${p.publicationYear.toString()})`).join(' | ') ?? '',

    directorBoardProfileImage: user.DirectorBoard?.profileImage ?? '',
    aboutMe: user.DirectorBoard
      ? (getProseMirrorText({
          proseMirror: user.DirectorBoard.aboutMe as JSONContent,
          tiptapConfiguration,
        }) ?? '')
      : '',
    directorPosition: user.DirectorBoard?.DirectorPosition?.position ?? '',
  }

  return flattenedUser
}
