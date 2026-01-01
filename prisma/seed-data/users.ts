import type { Prisma } from '@prisma/client'
import { EducationLevelType, IdentityType, MembershipStatusType, OccupationType, UserRoleType } from '@prisma/client'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { hashSync } from 'bcryptjs'
import { env } from '../../src/env/index'
import { academicPublicationsCreateUserDataArray1 } from './academic-publications'
import { activityAreaData1, subActivityAreaData1 } from './activity-areas'
import {
  directorBoardCreateNestedUserData1,
  directorBoardCreateNestedUserData2,
  directorBoardCreateNestedUserData3,
  directorBoardCreateNestedUserData4,
  directorBoardCreateNestedUserData5,
  directorBoardCreateNestedUserData6,
  directorBoardCreateNestedUserData7,
} from './directors-board'
import { enrolledCourseNestedUserData1 } from './enrolled-courses'
import { institutionData1 } from './institutions'
import { keywordsConnectOrCreateUserData1 } from './keywords'

type PartialUserCreateInputInfo = Omit<
  Prisma.UserCreateInput,
  'fullName' | 'username' | 'email' | 'identityType' | 'identityDocument' | 'role' | 'DirectorBoard'
>

const passwordHash = hashSync('123456789Az#', env.HASH_SALT_ROUNDS)

export const partialUserData1: PartialUserCreateInputInfo = {
  passwordHash,
  birthdate: new Date('2025-09-22'),
  profileImage: 'default.png',
  linkLattes: 'http://lattes.cnpq.br/1234567890',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  membershipStatus: MembershipStatusType.ACTIVE,
  departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
  institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
  occupation: OccupationType.RESEARCHER,
  educationLevel: EducationLevelType.DOCTORATE_STUDENT,
  emailIsPublic: true,
  astrobiologyOrRelatedStartYear: 2010,
  interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
  receiveReports: true,
  loginAttempts: 0,
  lastLogin: null,
  publicInformation: 'ASTROBIÓLOGO',
  wantsNewsletter: true,

  EnrolledCourse: enrolledCourseNestedUserData1,

  AcademicPublication: { create: academicPublicationsCreateUserDataArray1 },

  Keyword: {
    connectOrCreate: keywordsConnectOrCreateUserData1,
  },

  Institution: {
    connect: {
      name: institutionData1.name,
    },
  },

  ActivityArea: {
    connect: {
      type_area: activityAreaData1,
    },
  },

  SubActivityArea: {
    connect: {
      type_area: subActivityAreaData1,
    },
  },
}

const adminUserData1: Prisma.UserCreateInput = {
  ...partialUserData1,
  fullName: 'admin',
  email: 'admin@email.com',
  username: 'ADMIN.ADMIN',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-00',
  role: UserRoleType.ADMIN,
}

const managerUserData1: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/1918385364299862',
  fullName: 'Gustavo Porto de Mello',
  email: 'gustavo@email.com',
  username: 'gustavo.porto',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-01',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData1,
}

const managerUserData2: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/9117662545474146',
  fullName: 'Douglas Galante',
  email: 'douglas@email.com',
  username: 'douglas.galante',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-02',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData2,
}

const managerUserData3: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/5093103617210826',
  fullName: 'Beatriz Siffert',
  email: 'beatriz@email.com',
  username: 'beatriz.siffert',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-03',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData3,
}

const managerUserData4: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/7450204581620194',
  fullName: 'Amanda Bendia',
  email: 'amanda@email.com',
  username: 'amanda.bendia',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-04',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData4,
}

const managerUserData5: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/5822376591265210',
  fullName: 'Fábio Rodrigues',
  email: 'fabio@email.com',
  username: 'fabio.rodrigues',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-05',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData5,
}

const managerUserData6: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/1704175571734114',
  fullName: 'Flávia Callefo',
  email: 'flavia@email.com',
  username: 'flavia.callefo',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-06',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData6,
}

const managerUserData7: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'http://lattes.cnpq.br/4916914753471904',
  fullName: 'Claudia Lage',
  email: 'claudia@email.com',
  username: 'claudia.lage',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-07',
  role: UserRoleType.MANAGER,

  DirectorBoard: directorBoardCreateNestedUserData7,
}

export const contentLeaderUserData1: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'https://lattes.cnpq.br/3390986971402979',
  fullName: 'Danilo Albergaria',
  email: 'danilo@gmail.com',
  username: 'danilo.albergaria',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-08',
  role: UserRoleType.CONTENT_LEADER,
}

export const contentProducerUserData1: Prisma.UserCreateInput = {
  ...partialUserData1,
  linkLattes: 'https://lattes.cnpq.br/3390986971402979',
  fullName: 'Allber Ferreira',
  email: 'allber@gmail.com',
  username: 'allber.ferreira',
  identityType: IdentityType.CPF,
  identityDocument: '123.456.789-09',
  role: UserRoleType.CONTENT_PRODUCER,
}

export const usersDataArray1: Prisma.UserCreateInput[] = [
  adminUserData1,
  managerUserData1,
  managerUserData2,
  managerUserData3,
  managerUserData4,
  managerUserData5,
  managerUserData6,
  managerUserData7,
  contentLeaderUserData1,
  contentProducerUserData1,
]

export const usersDataArray2: Prisma.UserCreateInput[] = [
  {
    ...partialUserData1,
    fullName: 'ALÍCIA DOS SANTOS DA CONCEIÇÃO',
    username: 'alicia123',
    email: 'alicia@gmail.com',
    identityType: IdentityType.CPF,
    identityDocument: `100.000.000-00`,
    receiveReports: false,
  },
]

// Criando Usuários Dummy para Testar Paginações no Frontend:
for (let idx = 0; idx <= 90; idx++) {
  usersDataArray2.push({
    ...partialUserData1,
    identityType: IdentityType.CPF,
    identityDocument: `000.000.000-${idx.toString().padStart(2, '0')}`,
    fullName: `DUMMY USER ${idx}`,
    username: `DUMMY USER ${idx}`,
    email: `random-normal-dummy-user-${idx}@email.com`,
    wantsNewsletter: getRandomArrayElement([true, false]),
  })
}

// Criando Usuário Dummy com Pedidos de Associação Pendentes para Testar Paginação no Frontend:
export const usersDataArray3: Prisma.UserCreateInput[] = []

for (let idx = 0; idx <= 90; idx++) {
  usersDataArray3.push({
    ...partialUserData1,
    identityType: IdentityType.CPF,
    identityDocument: `200.000.000-${idx.toString().padStart(2, '0')}`,
    fullName: `DUMMY USER PENDING ${idx}`,
    username: `DUMMY USER PENDING ${idx}`,
    email: `random-normal-pending-dummy-user-${idx}@email.com`,
    wantsNewsletter: getRandomArrayElement([true, false]),
  })
}
