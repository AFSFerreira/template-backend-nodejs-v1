export interface FlattenedUser {
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

  directorBoardProfileImage: string
  aboutMe: string
  directorPosition: string
}
