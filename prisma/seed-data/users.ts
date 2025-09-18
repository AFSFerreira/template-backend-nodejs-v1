import {
  ActivityAreaType,
  EducationLevelType,
  IdentityType,
  MembershipStatusType,
  OccupationType,
  UserRoleType,
} from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { academicPublicationsData } from './academic-publications'
import { activityAreasData, subActivityAreasData } from './activity-areas'
import { addressData1, addressData2 } from './addresses'
import { directorBoardData } from './directors-board'
import { enrolledCourseData } from './enrolled-courses'
import { institutionData1, institutionData2 } from './institutions'
import { keywordsData } from './keywords'
import { env } from '../../src/env/index'

const passwordHash = hashSync('123456789Az#', env.HASH_SALT_ROUNDS)

export const userData1 = {
  fullName: 'ADMIN',
  username: 'ADMIN.ADMIN',
  email: 'admin@email.com',
  passwordHash,
  birthdate: new Date(),
  profileImage: '/src/uploads/profile-images/default-profile-pic.png',
  linkLattes: 'http://lattes.cnpq.br/1234567890',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  membershipStatus: MembershipStatusType.ACTIVE,
  role: UserRoleType.ADMIN,
  departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
  institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
  occupation: OccupationType.RESEARCHER,
  educationLevel: EducationLevelType.DOCTORATE,
  emailIsPublic: true,
  astrobiologyOrRelatedStartYear: 2010,
  interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
  receiveReports: true,
  loginAttempts: 0,
  lastLogin: new Date(),
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-00',
  publicInformation: 'ASTROBIÓLOGO',

  Address: { create: addressData1 },

  EnrolledCourse: { create: enrolledCourseData },

  DirectorBoard: { create: directorBoardData },

  AcademicPublication: { create: academicPublicationsData },

  Keyword: {
    connectOrCreate: keywordsData.map((keyword) => ({
      where: { value: keyword },
      create: { value: keyword },
    })),
  },

  Institution: {
    connectOrCreate: {
      where: institutionData2,
      create: institutionData2,
    },
  },

  ActivityArea: {
    connect: {
      type_area: {
        area: activityAreasData[0],
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
    },
  },

  SubActivityArea: {
    connect: {
      type_area: {
        area: subActivityAreasData[0],
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      },
    },
  },
}

export const userData2 = {
  fullName: 'COMMON USER',
  username: 'USER.USER',
  email: 'user@email.com',
  passwordHash,
  birthdate: new Date(),
  profileImage: '/src/uploads/profile-images/default-profile-pic.png',
  linkLattes: 'http://lattes.cnpq.br/1234567890',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  membershipStatus: MembershipStatusType.PENDING,
  role: UserRoleType.DEFAULT,
  departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
  institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
  occupation: OccupationType.RESEARCHER,
  educationLevel: EducationLevelType.DOCTORATE,
  emailIsPublic: true,
  astrobiologyOrRelatedStartYear: 2010,
  interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
  receiveReports: true,
  loginAttempts: 0,
  lastLogin: new Date(),
  identityType: IdentityType.CPF,
  identityDocument: '987.654.321-00',
  publicInformation: 'ASTROBIÓLOGO',

  Address: { create: addressData1 },

  EnrolledCourse: { create: enrolledCourseData },

  AcademicPublication: { create: academicPublicationsData },

  Institution: {
    connectOrCreate: {
      where: institutionData2,
      create: institutionData2,
    },
  },

  Keyword: {
    connectOrCreate: keywordsData.map((keyword) => ({
      where: { value: keyword },
      create: { value: keyword },
    })),
  },

  ActivityArea: {
    connect: {
      type_area: {
        area: activityAreasData[0],
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
    },
  },

  SubActivityArea: {
    connect: {
      type_area: {
        area: subActivityAreasData[0],
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      },
    },
  },
}

export const dummyUserInfoArray = []
const DUMMY_USER_QUANTITY = 20

// Criando Usuários Dummy para Testar Paginações no Frontend:
for (let i = 1; i <= DUMMY_USER_QUANTITY; i++) {
  dummyUserInfoArray.push({
    fullName: `DUMMY USER ${i}`,
    username: `DUMMY USER ${i}`,
    email: `dummy-user${i}@email.com`,
    passwordHash,
    birthdate: new Date(),
    profileImage: '/src/uploads/profile-images/default-profile-pic.png',
    linkLattes: 'http://lattes.cnpq.br/1234567890',
    linkGoogleScholar: 'https://scholar.google.com/admin.admin',
    linkResearcherId: null,
    orcidNumber: '0000-0001-2345-6789',
    membershipStatus: MembershipStatusType.ACTIVE,
    role: UserRoleType.DEFAULT,
    departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
    institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
    occupation: OccupationType.RESEARCHER,
    educationLevel: EducationLevelType.DOCTORATE,
    emailIsPublic: true,
    astrobiologyOrRelatedStartYear: 2010,
    interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
    receiveReports: true,
    loginAttempts: 0,
    lastLogin: new Date(),
    identityType: IdentityType.CPF,
    identityDocument: `000.000.000-${i.toString().padStart(2, '0')}`,
    publicInformation: 'ASTROBIÓLOGO',

    Address: { create: addressData2 },

    EnrolledCourse: { create: enrolledCourseData },

    AcademicPublication: { create: academicPublicationsData },

    Institution: {
      connectOrCreate: {
        where: institutionData1,
        create: institutionData1,
      },
    },

    Keyword: {
      connectOrCreate: keywordsData.map((keyword) => ({
        where: { value: keyword },
        create: { value: keyword },
      })),
    },

    ActivityArea: {
      connect: {
        type_area: {
          area: activityAreasData[0],
          type: ActivityAreaType.AREA_OF_ACTIVITY,
        },
      },
    },

    SubActivityArea: {
      connect: {
        type_area: {
          area: subActivityAreasData[0],
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
      },
    },
  })
}
