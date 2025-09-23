import type { CustomUserWithSimplifiedDetails } from '@custom-types/custom-user-with-simplified-details-type'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { EducationLevelType, IdentityType, OccupationType, User, UserRoleType } from '@prisma/client'
import { formatDate } from '@utils/format-date'

interface HTTPSimplifiedUserDetails {
  id: string
  fullName: string
  institutionName: string
  state: string
  email?: string
}

interface HTTPUser {
  id: string
  fullName: string
  email: string
  username: string
  role: UserRoleType
  birthdate: string | null | undefined
  linkLattes: string | null
  linkGoogleScholar: string | null
  linkResearcherId: string | null
  orcidNumber: string | null
  departmentName: string | null
  institutionComplement: string | null
  occupation: OccupationType
  educationLevel: EducationLevelType
  identityType: IdentityType
  identityDocument: string
  emailIsPublic: boolean
  astrobiologyOrRelatedStartYear: number
  interestDescription: string
  receiveReports: boolean
  publicInformation: string
}

interface HTTPUserDetails {
  id: string
  fullName: string
  email: string
  username: string
  role: UserRoleType
  birthdate: string | null | undefined
  linkLattes: string | null
  linkGoogleScholar: string | null
  linkResearcherId: string | null
  orcidNumber: string | null
  institutionName: string
  departmentName: string | null
  institutionComplement: string | null
  occupation: OccupationType
  educationLevel: EducationLevelType
  identityType: IdentityType
  identityDocument: string
  emailIsPublic: boolean
  astrobiologyOrRelatedStartYear: number
  interestDescription: string
  receiveReports: boolean
  publicInformation: string
  keywords: string[]
  mainActivityArea: string
  address: HTTPAddress
  enrolledCourse: HTTPEnrolledCourse
  academicPublications: HTTPAcademicPublications[]
}

interface HTTPAddress {
  zip: string | undefined
  number: string | undefined
  street: string | undefined
  district: string | undefined
  city: string | undefined
  state: string | undefined
  country: string | undefined
}

interface HTTPEnrolledCourse {
  courseName?: string | null
  startGraduationDate?: string | null
  expectedGraduationDate?: string | null
  supervisorName?: string | null
  scholarshipHolder?: boolean
  sponsoringOrganization?: string | null
}

interface HTTPAcademicPublications {
  title: string
  authors: string
  publicationYear: number | undefined | null
  journalName: string
  volume: string
  editionNumber: string
  startPage: string
  linkDoi: string
}

interface HTTPDirectorBoardInfo {
  directorBoardProfileImage: string
  aboutMe: string
  position: string
}

interface HTTPUserWithDetails extends HTTPUserDetails {
  directorBoardInfo: HTTPDirectorBoardInfo | null
}

export class UserPresenter {
  static toHTTPSimplified(user: CustomUserWithSimplifiedDetails): HTTPSimplifiedUserDetails
  static toHTTPSimplified(users: CustomUserWithSimplifiedDetails[]): HTTPSimplifiedUserDetails[]
  static toHTTPSimplified(
    input: CustomUserWithSimplifiedDetails | CustomUserWithSimplifiedDetails[],
  ): HTTPSimplifiedUserDetails | HTTPSimplifiedUserDetails[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTPSimplified(user))
    }

    return {
      id: input.publicId,
      fullName: input.fullName,
      institutionName: input.institutionName,
      state: input.state,
      email: input.emailIsPublic ? input.email : null,
    }
  }

  static toHTTPDetailed(user: UserWithDetails): HTTPUserWithDetails
  static toHTTPDetailed(users: UserWithDetails[]): HTTPUserWithDetails[]
  static toHTTPDetailed(input: UserWithDetails | UserWithDetails[]): HTTPUserWithDetails | HTTPUserWithDetails[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTPDetailed(user))
    }

    const {
      id,
      passwordHash,
      publicId,
      membershipStatus,
      loginAttempts,
      lastLogin,
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
      createdAt,
      updatedAt,
      activityAreaId,
      ActivityArea,
      AcademicPublication,
      Keyword,
      Address,
      EnrolledCourse,
      DirectorBoard,
      ...userFiltered
    } = input

    return {
      ...userFiltered,
      id: input.publicId,
      birthdate: formatDate(input.birthdate),

      institutionName: input.Institution.name,

      keywords: input.Keyword.map((keyword) => keyword.value),

      mainActivityArea: input.ActivityArea.area,

      address: {
        zip: input.Address?.zip,
        number: input.Address?.number,
        district: input.Address?.district,
        street: input.Address?.street,
        city: input.Address?.city,
        country: input.Address?.country,
        state: input.Address?.state,
      },

      enrolledCourse: {
        courseName: input.EnrolledCourse?.courseName,
        startGraduationDate: formatDate(input.EnrolledCourse?.startGraduationDate, 'mm/yyyy'),
        expectedGraduationDate: formatDate(input.EnrolledCourse?.expectedGraduationDate, 'mm/yyyy'),
        supervisorName: input.EnrolledCourse?.supervisorName,
        scholarshipHolder: input.EnrolledCourse?.scholarshipHolder,
        sponsoringOrganization: input.EnrolledCourse?.sponsoringOrganization,
      },

      academicPublications: input.AcademicPublication.map((academicPublication) => ({
        title: academicPublication.title,
        authors: academicPublication.authors,
        publicationYear: academicPublication.publicationYear,
        journalName: academicPublication.journalName,
        volume: academicPublication.volume,
        editionNumber: academicPublication.editionNumber,
        startPage: academicPublication.startPage,
        linkDoi: academicPublication.linkDoi,
      })),

      directorBoardInfo:
        input.DirectorBoard !== null
          ? {
              directorBoardProfileImage: input.DirectorBoard.directorBoardProfileImage,
              aboutMe: input.DirectorBoard.aboutMe,
              position: input.DirectorBoard.position,
            }
          : null,
    }
  }

  static toHTTP(user: User): HTTPUser
  static toHTTP(users: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => UserPresenter.toHTTP(user))
    }

    const {
      id,
      passwordHash,
      publicId,
      membershipStatus,
      loginAttempts,
      lastLogin,
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
      activityAreaId,
      ...userFiltered
    } = input

    return {
      ...userFiltered,
      id: input.publicId,
      birthdate: formatDate(input.birthdate),
    }
  }
}
