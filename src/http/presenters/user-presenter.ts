import type {
  EducationLevel,
  IdentityType,
  Occupation,
  UserRole,
} from '@prisma/client'
import type { UserWithDetails } from '@/@types/user-with-details'
import { formatDate } from '@/utils/format-date'

interface HTTPUserDetails {
  id: string
  fullName: string
  email: string
  username: string
  role: UserRole
  birthdate: string | null | undefined
  linkLattes: string | null
  linkGoogleScholar: string | null
  linkResearcherId: string | null
  orcidNumber: string | null
  institutionName: string
  departmentName: string | null
  institutionComplement: string | null
  occupation: Occupation
  educationLevel: EducationLevel
  identityType: IdentityType
  identityDocument: string
  emailIsPublic: boolean
  astrobiologyOrRelatedStartYear: number
  interestDescription: string
  receiveReports: boolean
  publicInformation: string
  specificActivity: string
  specificActivityDescription: string | null
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
  courseName: string | undefined | null
  startGraduationDate: string | undefined | null
  expectedGraduationDate: string | undefined | null
  supervisorName: string | undefined | null
  scholarshipHolder: boolean | undefined
  sponsoringOrganization: string | undefined | null
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

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserPresenter {
  static toHTTP(user: UserWithDetails): HTTPUser
  static toHTTP(users: UserWithDetails[]): HTTPUser[]
  static toHTTP(
    input: UserWithDetails | UserWithDetails[],
  ): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => this.toHTTP(user))
    }

    const {
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
      activityArea,
      AcademicPublication,
      ...userFiltered
    } = input

    return {
      userDetails: {
        ...userFiltered,
        id: input.publicId,
        birthdate: formatDate(input.birthdate),

        keywords: input.UserKeywords.map((keyword) => keyword.value),

        mainActivityArea: input.activityArea.value,

        address: {
          zip: input.address?.zip,
          number: input.address?.number,
          street: input.address?.street,
          district: input.address?.district,
          city: input.address?.city,
          state: input.address?.state,
          country: input.address?.country,
        },

        enrolledCourse: {
          courseName: input.enrolledCourse?.courseName,
          startGraduationDate: formatDate(
            input.enrolledCourse?.startGraduationDate,
            'mm/yyyy',
          ),
          expectedGraduationDate: formatDate(
            input.enrolledCourse?.expectedGraduationDate,
            'mm/yyyy',
          ),
          supervisorName: input.enrolledCourse?.supervisorName,
          scholarshipHolder: input.enrolledCourse?.scholarshipHolder,
          sponsoringOrganization: input.enrolledCourse?.sponsoringOrganization,
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
