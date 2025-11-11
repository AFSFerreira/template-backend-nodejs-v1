import type { Prisma } from '@prisma/client'
import {
  ActivityAreaType,
  EducationLevelType,
  IdentityType,
  MembershipStatusType,
  OccupationType,
  UserRoleType,
} from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { academicPublicationsData1 } from './academic-publications'
import { activityAreasData1, subActivityAreasData1 } from './activity-areas'
import { addressData1, addressData2 } from './addresses'
import { directorBoardsArray } from './directors-board'
import { enrolledCourseData1 } from './enrolled-courses'
import { institutionData1, institutionData2 } from './institutions'
import { keywordsData1 } from './keywords'
import { env } from '../../src/env/index'
import { directorPositionData1 } from './director-positions'

const passwordHash = hashSync('123456789Az#', env.HASH_SALT_ROUNDS)

export const userData1: Prisma.UserCreateInput = {
  fullName: 'ADMIN',
  username: 'ADMIN.ADMIN',
  email: 'admin@email.com',
  passwordHash,
  birthdate: new Date('2025-09-22'),
  profileImage: 'default-profile-pic.png',
  linkLattes: 'http://lattes.cnpq.br/1234567890',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  membershipStatus: MembershipStatusType.ACTIVE,
  role: UserRoleType.ADMIN,
  departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
  institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
  occupation: OccupationType.RESEARCHER,
  educationLevel: EducationLevelType.DOCTORATE_STUDENT,
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

  EnrolledCourse: { create: enrolledCourseData1 },

  // DirectorBoard: { create: directorBoardData1 },

  AcademicPublication: { create: academicPublicationsData1 },

  Keyword: {
    connectOrCreate: keywordsData1.map((keyword) => ({
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
        area: activityAreasData1[1],
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
    },
  },

  SubActivityArea: {
    connect: {
      type_area: {
        area: subActivityAreasData1[2],
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      },
    },
  },
}

export const userData2 = {
  fullName: 'Douglas Galante',
  username: 'USER.USER',
  email: 'user@email.com',
  passwordHash,
  birthdate: new Date(),
  profileImage: 'default-profile-pic.png',
  linkLattes: 'http://lattes.cnpq.br/1234567890',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  membershipStatus: MembershipStatusType.ACTIVE,
  role: UserRoleType.MANAGER,
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

  EnrolledCourse: { create: enrolledCourseData1 },

  AcademicPublication: { create: academicPublicationsData1 },

  Institution: {
    connectOrCreate: {
      where: institutionData2,
      create: institutionData2,
    },
  },

  Keyword: {
    connectOrCreate: keywordsData1.map((keyword) => ({
      where: { value: keyword },
      create: { value: keyword },
    })),
  },

  ActivityArea: {
    connect: {
      type_area: {
        area: activityAreasData1[0],
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
    },
  },

  SubActivityArea: {
    connect: {
      type_area: {
        area: subActivityAreasData1[0],
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      },
    },
  },
}

const partialDummyUserData = {
  passwordHash,
  birthdate: new Date(),
  profileImage: 'default-profile-pic.png',
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
  publicInformation: 'ASTROBIÓLOGO',

  Address: { create: addressData2 },

  EnrolledCourse: { create: enrolledCourseData1 },

  AcademicPublication: { create: academicPublicationsData1 },

  Institution: {
    connectOrCreate: {
      where: institutionData1,
      create: institutionData1,
    },
  },

  Keyword: {
    connectOrCreate: keywordsData1.map((keyword) => ({
      where: { value: keyword },
      create: { value: keyword },
    })),
  },

  ActivityArea: {
    connect: {
      type_area: {
        area: activityAreasData1[0],
        type: ActivityAreaType.AREA_OF_ACTIVITY,
      },
    },
  },

  SubActivityArea: {
    connect: {
      type_area: {
        area: subActivityAreasData1[0],
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      },
    },
  },
}

export const dummyUserInfoArray: Prisma.UserCreateInput[] = [
  {
    ...partialDummyUserData,
    receiveReports: false,
    identityDocument: `100.000.000-00`,
    fullName: 'ALÍCIA DOS SANTOS DA CONCEIÇÃO',
    username: 'alicia123',
    email: 'alicia@gmail.com',
  },
]

export const dummyUserDirectorBoardInfoArray: Prisma.UserCreateInput[] = []

// Criando Usuários Dummy para Testar Paginações no Frontend:
for (let i = 0; i <= 20; i++) {
  dummyUserInfoArray.push({
    ...partialDummyUserData,
    identityDocument: `000.000.000-${i.toString().padStart(2, '0')}`,
    fullName: `DUMMY USER ${i}`,
    username: `DUMMY USER ${i}`,
    email: `dummy-user${i}@email.com`,

    Keyword: {
      connectOrCreate: keywordsData1.slice(0, 2).map((keyword) => ({
        where: { value: keyword },
        create: { value: keyword },
      })),
    },
  })
}

// WARNING: Remover esse Trecho de Informações Posteriormente
// Criando Usuários Dummy do Corpo Diretivo:
directorBoardsArray.forEach((directorBoard, index) => {
  dummyUserDirectorBoardInfoArray.push({
    ...partialDummyUserData,
    role: directorBoard.DirectorPosition.connect.position === directorPositionData1.position ? UserRoleType.ADMIN : UserRoleType.MANAGER,
    identityDocument: `000.000.000-${(index + 50).toString().padStart(2, '0')}`,
    fullName: directorBoard.fullName,
    username: directorBoard.fullName.split(' ').join('.'),
    email: `director-email-${index + 1}@email.com`,

    Keyword: {
      connectOrCreate: keywordsData1.slice(0, 2).map((keyword) => ({
        where: { value: keyword },
        create: { value: keyword },
      })),
    },
  })
})
