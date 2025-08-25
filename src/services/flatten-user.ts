import type { UserWithDetails } from '@custom-types/user-with-details'
import type { Keyword } from '@prisma/client'

interface FlattenedUser {
  id: string
  fullName: string
  username: string
  email: string
  birthDate: string
  institutionName: string
  departmentName: string
  occupation: string
  educationLevel: string
  membershipStatus: string
  identityType: string
  identityDocument: string
  activityAreaDescription: string
  subActivityAreaDescription: string
  interestDescription: string
  publicInformation: string
  astrobiologyOrRelatedStartYear: number
  emailIsPublic: boolean
  receiveReports: boolean
  lastLogin: string
  createdAt: string
  updatedAt: string

  number: string
  street: string
  district: string
  city: string
  state: string
  zip: string
  country: string
  complement: string

  mainAreaActivity: string

  courseName: string
  startGraduationDate: string
  expectedGraduationDate: string
  supervisorName: string
  scholarshipHolder: boolean
  sponsoringOrganization: string

  keywords: string
  publications: string

  directorBoardPublicId: string
  directorBoardProfileImage: string
  aboutMe: string
}

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

    number: user.Address?.number ?? '',
    street: user.Address?.street ?? '',
    district: user.Address?.district ?? '',
    city: user.Address?.city ?? '',
    state: user.Address?.state ?? '',
    zip: user.Address?.zip ?? '',
    country: user.Address?.country ?? '',
    complement: user.Address?.complement ?? '',

    mainAreaActivity: user.ActivityArea?.area ?? '',

    courseName: user.EnrolledCourse?.courseName ?? '',
    startGraduationDate:
      user.EnrolledCourse?.startGraduationDate?.toISOString().slice(0, 7) ?? '',
    expectedGraduationDate:
      user.EnrolledCourse?.expectedGraduationDate?.toISOString().slice(0, 7) ??
      '',
    supervisorName: user.EnrolledCourse?.supervisorName ?? '',
    scholarshipHolder: user.EnrolledCourse?.scholarshipHolder ?? false,
    sponsoringOrganization: user.EnrolledCourse?.sponsoringOrganization ?? '',

    keywords:
      user.Keyword?.map((k: Keyword) => k.value)
        .filter(Boolean)
        .join('; ') ?? '',

    publications:
      user.AcademicPublication?.map(
        (p) => `${p.title} (${p.publicationDate.toISOString().split('T')[0]})`,
      ).join(' | ') ?? '',

    directorBoardPublicId: user.DirectorBoard?.publicId ?? '',
    directorBoardProfileImage:
      user.DirectorBoard?.directorBoardProfileImage ?? '',
    aboutMe: user.DirectorBoard?.aboutMe ?? '',
  }

  return flattenedUser
}
