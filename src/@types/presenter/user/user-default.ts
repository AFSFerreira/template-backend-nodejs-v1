import type { EducationLevelType, IdentityType, OccupationType, UserRoleType } from '@prisma/client'

export interface HTTPUser {
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
