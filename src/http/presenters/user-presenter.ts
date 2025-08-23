import type {
  EducationLevelType,
  IdentityType,
  OccupationType,
  UserRoleType,
} from '@prisma/client'
import type { UserWithDetails } from '@/@types/user-with-details'
import { formatDate } from '@/utils/format-date'

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
  publicationDate: string | undefined | null
  journalName: string
  volume: string
  editionNumber: string
  pageInterval: string
  linkDOI: string
}

interface HTTPDirectorBoardInfo {
  directorBoardProfileImage: string
  aboutMe: string
}

interface HTTPUser {
  userDetails: HTTPUserDetails
  directorBoardInfo: HTTPDirectorBoardInfo | null
}

export class UserPresenter {
  static toHTTP(user: UserWithDetails): HTTPUser
  static toHTTP(users: UserWithDetails[]): HTTPUser[]
  static toHTTP(
    input: UserWithDetails | UserWithDetails[],
  ): HTTPUser | HTTPUser[] {
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
      recoveryPasswordToken,
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
      userDetails: {
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
          startGraduationDate: formatDate(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            input.EnrolledCourse?.startGraduationDate,
            'mm/yyyy',
          ),
          expectedGraduationDate: formatDate(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            input.EnrolledCourse?.expectedGraduationDate,
            'mm/yyyy',
          ),
          supervisorName: input.EnrolledCourse?.supervisorName,
          scholarshipHolder: input.EnrolledCourse?.scholarshipHolder,
          sponsoringOrganization: input.EnrolledCourse?.sponsoringOrganization,
        },

        academicPublications: input.AcademicPublication.map(
          (academicPublication) => ({
            title: academicPublication.title,
            authors: academicPublication.authors,
            publicationDate: formatDate(
              academicPublication.publicationDate,
              'mm/yyyy',
            ),
            journalName: academicPublication.journalName,
            volume: academicPublication.volume,
            editionNumber: academicPublication.editionNumber,
            pageInterval: academicPublication.pageInterval,
            linkDOI: academicPublication.linkDOI,
          }),
        ),
      },

      directorBoardInfo:
        input.DirectorBoard !== null
          ? {
              directorBoardProfileImage:
                input.DirectorBoard.directorBoardProfileImage,
              aboutMe: input.DirectorBoard.aboutMe,
            }
          : null,
    }
  }
}
