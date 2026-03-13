import type { Prisma } from '@prisma/generated/client'
import {
  EducationLevelType,
  IdentityType,
  MembershipStatusType,
  OccupationType,
  UserRoleType,
} from '@prisma/generated/enums'
import { HashService } from '@services/hashes/hash-service'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { cpf } from 'cpf-cnpj-validator'
import { academicPublicationsCreateUserDataArray1 } from './academic-publications'
import { activityAreaData1, subActivityAreaData1 } from './activity-areas'
import { enrolledCourseNestedUserData1 } from './enrolled-courses'
import { institutionData1 } from './institutions'
import { keywordsConnectOrCreateUserData1 } from './keywords'

type PartialUserCreateInputInfo = Omit<
  Prisma.UserCreateInput,
  | 'fullName'
  | 'username'
  | 'email'
  | 'identityType'
  | 'identityDocument'
  | 'identityDocumentBlindIndex'
  | 'role'
  | 'DirectorBoard'
>

type UserWithoutIdentityDocument = Omit<
  Prisma.UserCreateInput,
  'identityType' | 'identityDocument' | 'identityDocumentBlindIndex'
>

const passwordHash = await new HashService().hashPassword('123456789Az#')

const partialResearcherProfileData: Prisma.ResearcherProfileCreateWithoutUserInput = {
  linkLattes: 'http://lattes.cnpq.br/1918385364299862',
  linkGoogleScholar: 'https://scholar.google.com/admin.admin',
  linkResearcherId: null,
  orcidNumber: '0000-0001-2345-6789',
  departmentName: 'DEPARTAMENTO DE ASTROBIOLOGIA',
  institutionComplement: 'LABORATÓRIO DE VIDA EXTRATERRESTRE',
  occupation: OccupationType.RESEARCHER,
  activityAreaDescription: null,
  subActivityAreaDescription: null,
  publicInformation: 'ASTROBIÓLOGO',
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

export const partialUserData1: PartialUserCreateInputInfo = {
  passwordHash,
  birthdate: new Date('2025-09-22'),
  profileImage: 'default.png',
  membershipStatus: MembershipStatusType.ACTIVE,
  educationLevel: EducationLevelType.DOCTORATE_STUDENT,
  emailIsPublic: true,
  astrobiologyOrRelatedStartYear: 2010,
  interestDescription: 'PARTICIPO DA COMUNIDADE POR INTERESSE EM ORIGENS DA VIDA E EXOPLANETAS.',
  receiveReports: true,
  loginAttempts: 0,
  lastLogin: null,
  wantsNewsletter: false,
  ResearcherProfile: {
    create: partialResearcherProfileData,
  },
}

export const adminUserData1: UserWithoutIdentityDocument = {
  ...partialUserData1,
  fullName: 'admin',
  email: 'admin@email.com',
  username: 'ADMIN.ADMIN',
  role: UserRoleType.ADMIN,
}

export const managerUserData1: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/1918385364299862',
    },
  },
  fullName: 'Gustavo Porto de Mello',
  email: 'gustavo@email.com',
  username: 'gustavo.porto',
  role: UserRoleType.MANAGER,
}

export const managerUserData2: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/9117662545474146',
    },
  },
  fullName: 'Douglas Galante',
  email: 'douglas@email.com',
  username: 'douglas.galante',
  role: UserRoleType.MANAGER,
}

export const managerUserData3: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/5093103617210826',
    },
  },
  fullName: 'Beatriz Siffert',
  email: 'beatriz@email.com',
  username: 'beatriz.siffert',
  role: UserRoleType.MANAGER,
}

export const managerUserData4: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/7450204581620194',
    },
  },
  fullName: 'Amanda Bendia',
  email: 'amanda@email.com',
  username: 'amanda.bendia',
  role: UserRoleType.MANAGER,
}

export const managerUserData5: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/5822376591265210',
    },
  },
  fullName: 'Fábio Rodrigues',
  email: 'fabio@email.com',
  username: 'fabio.rodrigues',
  role: UserRoleType.MANAGER,
}

export const managerUserData6: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/1704175571734114',
    },
  },
  fullName: 'Flávia Callefo',
  email: 'flavia@email.com',
  username: 'flavia.callefo',
  role: UserRoleType.MANAGER,
}

export const managerUserData7: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/4916914753471904',
    },
  },
  fullName: 'Claudia Lage',
  email: 'claudia@email.com',
  username: 'claudia.lage',
  role: UserRoleType.MANAGER,
}

export const managerUserData8: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'http://lattes.cnpq.br/123456789',
    },
  },
  fullName: 'Dummy Manager',
  email: 'dummy-manager@email.com',
  username: 'dummy.manager',
  role: UserRoleType.MANAGER,
}

export const contentLeaderUserData1: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'https://lattes.cnpq.br/3390986971402979',
    },
  },
  fullName: 'Danilo Albergaria',
  email: 'danilo@email.com',
  username: 'danilo.albergaria',
  role: UserRoleType.CONTENT_LEADER,
}

export const contentProducerUserData1: UserWithoutIdentityDocument = {
  ...partialUserData1,
  ResearcherProfile: {
    create: {
      ...partialResearcherProfileData,
      linkLattes: 'https://lattes.cnpq.br/3390986971402979',
    },
  },
  fullName: 'Allber Ferreira',
  email: 'allber@email.com',
  username: 'allber.ferreira',
  role: UserRoleType.CONTENT_PRODUCER,
  wantsNewsletter: true,
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
  managerUserData8,
  contentLeaderUserData1,
  contentProducerUserData1,
].map((userWithoutIdentityDocument) => {
  const identityDocument = cpf.generate(true)
  const identityDocumentBlindIndex = new HashService().generateBlindIndex(identityDocument)

  return {
    ...userWithoutIdentityDocument,
    identityType: IdentityType.CPF,
    identityDocument,
    identityDocumentBlindIndex,
  }
})

export const usersDataArray2: Prisma.UserCreateInput[] = []

// Criando Usuários Dummy para Testar Paginações no Frontend:
for (let idx = 0; idx <= 90; idx++) {
  const identityDocument = cpf.generate(true)
  const identityDocumentBlindIndex = new HashService().generateBlindIndex(identityDocument)

  usersDataArray2.push({
    ...partialUserData1,
    fullName: `DUMMY USER ${idx}`,
    username: `DUMMY USER ${idx}`,
    email: `random-normal-dummy-user-${idx}@email.com`,
    wantsNewsletter: getRandomArrayElement([true, false]),
    identityType: IdentityType.CPF,
    identityDocument,
    identityDocumentBlindIndex,
  })
}

// Criando Usuário Dummy com Pedidos de Associação Pendentes para Testar Paginação no Frontend:
export const usersDataArray3: Prisma.UserCreateInput[] = []

for (let idx = 0; idx <= 90; idx++) {
  const identityDocument = cpf.generate(true)
  const identityDocumentBlindIndex = new HashService().generateBlindIndex(identityDocument)

  usersDataArray3.push({
    ...partialUserData1,
    membershipStatus: MembershipStatusType.PENDING,

    fullName: `DUMMY USER PENDING ${idx}`,
    username: `DUMMY USER PENDING ${idx}`,
    email: `random-normal-pending-dummy-user-${idx}@email.com`,
    wantsNewsletter: getRandomArrayElement([true, false]),
    identityType: IdentityType.CPF,
    identityDocument,
    identityDocumentBlindIndex,
  })
}
