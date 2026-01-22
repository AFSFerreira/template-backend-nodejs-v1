import type { EducationLevelType, IdentityType, OccupationType, User, UserRoleType } from '@prisma/client'

export interface UserDefaultPresenterInput extends User {}

export interface HTTPUser {
  id: string
  fullName: string
  email: string
  username: string
  role: UserRoleType
  profileImage: string
  birthdate: string | null | undefined
  linkLattes: string | null
  linkGoogleScholar: string | null
  linkResearcherId: string | null
  orcidNumber: string | null
  departmentName: string | null
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
}
