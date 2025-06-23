import { env } from '@/env'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AddressRepository } from '@/repositories/address-repository'
import type { AreaOfActivityRepository } from '@/repositories/area-of-activity-repository'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'
import type { KeywordRepository } from '@/repositories/keyword-repository'
import {
  MEMBERSHIP_STATUS,
  USER_ROLE,
  type EDUCATION_LEVEL,
  type IDENTITY_TYPE,
  type OCCUPATION,
  type User,
} from '@prisma/client'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '../repositories/users-repository'
import { InvalidMainAreaOfActivity } from './errors/invalid-main-area-of-activity-error'
import { UserWithSameEmailOrUsernameError } from './errors/user-with-same-email-error'

interface AcademicPublications {
  title: string
  authors: string
  publicationDate: Date
  journalName: string
  volume: string
  editionNumber: string
  pageInterval: string
  doiLink: string
}

interface RegisterUseCaseRequest {
  email: string
  password: string
  fullName: string
  username: string
  profileImagePath?: string
  birthDate: Date
  lattesCVLink?: string
  profileGSLink?: string
  profileRIDLink?: string
  orcidNumber?: string
  institutionName: string
  departmentName?: string
  institutionComplement?: string
  occupation: OCCUPATION
  educationLevel: EDUCATION_LEVEL
  identityType: IDENTITY_TYPE
  identityDocument: string
  emailIsPublic: boolean
  astrobiologyOrRelatedStartYear: number
  interestDescription: string
  receiveReports: boolean
  publicInformation: string
  mainAreaActivity: string
  specificActivity: string
  specificActivityDescription?: string

  keywords: string[]

  postalCode: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  houseNumber: string

  courseName?: string
  startGraduationDate?: Date
  expectedGraduationDate?: Date
  supervisorName?: string
  scholarshipHolder: boolean
  sponsoringOrganization?: string

  academicPublications: AcademicPublications[]
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
    private readonly areaOfActivitiesRepository: AreaOfActivityRepository,
    private readonly enrolledCoursesRepository: EnrolledCourseRepository,
    private readonly keywordsRepository: KeywordRepository,
  ) {}

  async execute({
    email,
    password,
    fullName,
    profileImagePath,
    username,
    birthDate,
    lattesCVLink,
    profileGSLink,
    profileRIDLink,
    orcidNumber,
    institutionName,
    departmentName,
    institutionComplement,
    occupation,
    educationLevel,
    identityType,
    identityDocument,
    emailIsPublic,
    astrobiologyOrRelatedStartYear,
    interestDescription,
    receiveReports,
    publicInformation,
    mainAreaActivity,
    specificActivity,
    specificActivityDescription,
    keywords,
    houseNumber,
    street,
    neighborhood,
    city,
    postalCode,
    state,
    country,
    courseName,
    startGraduationDate,
    expectedGraduationDate,
    supervisorName,
    scholarshipHolder,
    sponsoringOrganization,
    academicPublications,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const existingUser = await this.usersRepository.findBy({
      OR: [{ email }, { username }],
    })

    if (existingUser !== null) {
      throw new UserWithSameEmailOrUsernameError()
    }

    const mainAreaOfActivity =
      await this.areaOfActivitiesRepository.findByMainAreaActivity(
        mainAreaActivity,
      )

    if (mainAreaOfActivity === null) {
      throw new InvalidMainAreaOfActivity()
    }

    const passwordDigest = await hash(
      password,
      env.USER_PASSWORD_HASH_NUMBER_TIMES,
    )

    const user = await this.usersRepository.create({
      email,
      passwordDigest,
      fullName,
      username,
      birthDate,
      profileImagePath:
        profileImagePath ??
        './src/uploads/profile-images/default-profile-pic.png',
      lattesCVLink,
      profileGSLink,
      profileRIDLink,
      orcidNumber,
      membershipStatus: MEMBERSHIP_STATUS.PENDING,
      userRole: USER_ROLE.NORMAL_USER,
      institutionName,
      departmentName,
      institutionComplement,
      occupation,
      educationLevel,
      identityType,
      identityDocument,
      emailIsPublic,
      astrobiologyOrRelatedStartYear,
      interestDescription,
      receiveReports,
      publicInformation,
      specificActivity,
      specificActivityDescription,
      activityAreaId: mainAreaOfActivity.id,
    })

    await this.addressRepository.create({
      postalCode,
      houseNumber,
      street,
      neighborhood,
      city,
      state,
      country,
      userId: user.id,
    })

    await this.enrolledCoursesRepository.create({
      courseName,
      startGraduationDate,
      expectedGraduationDate,
      supervisorName,
      scholarshipHolder,
      sponsoringOrganization,
      userId: user.id,
    })

    for (const pub of academicPublications) {
      await this.academicPublicationsRepository.create({
        ...pub,
        userId: user.id,
      })
    }

    for (const keyword of keywords) {
      await this.keywordsRepository.create({
        value: keyword,
        userId: user.id,
      })
    }

    return { user }
  }
}
