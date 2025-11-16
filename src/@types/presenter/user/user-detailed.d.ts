import type { EducationLevelType, IdentityType, OccupationType, UserRoleType } from '@prisma/client'

export interface HTTPUserDetails {
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
  subActivityArea: string
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
  complement?: string
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
  directorBoardProfileImage: string
  name: string
  aboutMe: string
  position: string
  linkLattes?: string | null
}

interface HTTPUserWithDetails extends HTTPUserDetails {
  directorBoardInfo: HTTPDirectorBoardInfo | null
}
