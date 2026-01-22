import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type {
  EducationLevelType,
  IdentityType,
  MembershipStatusType,
  OccupationType,
  UserRoleType,
} from '@prisma/client'

export interface UserDetailedPresenterForAdminInput extends UserWithDetails {}

interface HTTPUserDetails {
  id: string
  fullName: string
  profileImage: string
  email: string
  username: string
  role: UserRoleType | null
  birthdate: string | null | undefined
  linkLattes: string | null
  linkGoogleScholar: string | null
  linkResearcherId: string | null
  orcidNumber: string | null
  institutionName?: string
  departmentName: string | null
  membershipStatus: MembershipStatusType
  institutionComplement: string | null
  occupation: OccupationType | null
  educationLevel: EducationLevelType
  identityType: IdentityType
  identityDocument: string
  emailIsPublic: boolean
  astrobiologyOrRelatedStartYear: number | null
  interestDescription: string
  receiveReports: boolean
  publicInformation: string | null
  keywords?: string[]
  mainActivityArea?: string
  subActivityArea?: string
  address?: HTTPAddress
  enrolledCourse?: HTTPEnrolledCourse
  academicPublications?: HTTPAcademicPublications[]
}

interface HTTPAddress {
  zip: string | undefined
  number: string | undefined
  street: string | undefined
  district: string | undefined
  city: string | undefined
  state: string | undefined
  country: string | undefined
  complement?: string | null
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
  authors: string[]
  publicationYear: number | undefined | null
  journalName: string
  volume: string
  editionNumber: string
  startPage: string
  linkDoi: string
  area: string
}

interface HTTPDirectorBoardInfo {
  profileImage: string
  name: string
  position: string
  linkLattes?: string | null
}

export interface HTTPUserWithDetailsForAdmin extends HTTPUserDetails {
  directorBoardInfo?: HTTPDirectorBoardInfo | null
}
