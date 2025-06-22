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
  specificActivity: string
  specificActivityDescription: string
  interestDescription: string
  publicInformation: string
  astrobiologyOrRelatedStartYear: number
  emailIsPublic: boolean
  receiveReports: boolean
  lastLogin: string
  createdAt: string
  updatedAt: string

  houseNumber: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  country: string

  mainAreaActivity: string

  courseName: string
  startGraduationDate: string
  expectedGraduationDate: string
  supervisorName: string
  scholarshipHolder: boolean
  sponsoringOrganization: string

  keywords: string
  publications: string
}

export function flattenUser(user: any): FlattenedUser {
  const flattenedUser = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    birthDate: user.birthDate.toISOString().split('T')[0],
    institutionName: user.institutionName,
    departmentName: user.departmentName ?? '',
    occupation: user.occupation,
    educationLevel: user.educationLevel,
    membershipStatus: user.membershipStatus,
    identityType: user.identityType,
    identityDocument: user.identityDocument,
    specificActivity: user.specificActivity,
    specificActivityDescription: user.specificActivityDescription ?? '',
    interestDescription: user.interestDescription,
    publicInformation: user.publicInformation,
    astrobiologyOrRelatedStartYear: user.astrobiologyOrRelatedStartYear,
    emailIsPublic: user.emailIsPublic,
    receiveReports: user.receiveReports,
    lastLogin: user.lastLogin?.toISOString() ?? '',
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),

    houseNumber: user.address?.houseNumber ?? '',
    street: user.address?.street ?? '',
    neighborhood: user.address?.neighborhood ?? '',
    city: user.address?.city ?? '',
    state: user.address?.state ?? '',
    postalCode: user.address?.postalCode ?? '',
    country: user.address?.country ?? '',

    mainAreaActivity: user.activityArea?.mainAreaActivity ?? '',

    courseName: user.enrolledCourse?.courseName ?? '',
    startGraduationDate: user.enrolledCourse?.startGraduationDate?.toISOString().slice(0, 7) ?? '',
    expectedGraduationDate: user.enrolledCourse?.expectedGraduationDate?.toISOString().slice(0, 7) ?? '',
    supervisorName: user.enrolledCourse?.supervisorName ?? '',
    scholarshipHolder: user.enrolledCourse?.scholarshipHolder ?? false,
    sponsoringOrganization: user.enrolledCourse?.sponsoringOrganization ?? '',

    keywords: user.keywords.map((k: any) => k.value).join('; '),
    publications: user.academicPublications.map((p: any) => `${p.title} (${p.publicationDate.toISOString().split('T')[0]})`).join(' | ')
  }

  console.log(flattenedUser)

  return flattenedUser
}
