import type { Prisma } from '@prisma/generated/client'
import {
  directorPositionData1,
  directorPositionData2,
  directorPositionData3,
  directorPositionData4,
  directorPositionData5,
  directorPositionData7,
  directorPositionData8,
} from './director-positions'
import { proseMirrorData5 } from './prose-mirrors'
import {
  adminUserData1,
  managerUserData1,
  managerUserData2,
  managerUserData3,
  managerUserData4,
  managerUserData5,
  managerUserData6,
  managerUserData7,
} from './users'

export const directorBoardWithoutUserData1: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData1.fullName,
  profileImage: 'gustavo-melo.png',
  DirectorPosition: { connect: { position: directorPositionData1.position } },
  User: {
    connect: {
      email: adminUserData1.email,
    },
  },
}

export const directorBoardWithoutUserData2: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData2.fullName,
  profileImage: 'douglas-galante.png',
  DirectorPosition: { connect: { position: directorPositionData2.position } },
  User: {
    connect: {
      email: managerUserData2.email,
    },
  },
}

export const directorBoardWithoutUserData3: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData3.fullName,
  profileImage: 'beatriz-siffert.png',
  DirectorPosition: { connect: { position: directorPositionData4.position } },
  User: {
    connect: {
      email: managerUserData3.email,
    },
  },
}

export const directorBoardWithoutUserData4: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData4.fullName,
  profileImage: 'amanda-bendia.png',
  DirectorPosition: { connect: { position: directorPositionData5.position } },
  User: {
    connect: {
      email: managerUserData4.email,
    },
  },
}

export const directorBoardWithoutUserData5: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData5.fullName,
  profileImage: 'fabio-rodrigues.png',
  DirectorPosition: { connect: { position: directorPositionData3.position } },
  User: {
    connect: {
      email: managerUserData5.email,
    },
  },
}

export const directorBoardWithoutUserData6: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData6.fullName,
  profileImage: 'flavia-callefo.png',
  DirectorPosition: { connect: { position: directorPositionData8.position } },
  User: {
    connect: {
      email: managerUserData6.email,
    },
  },
}

export const directorBoardWithoutUserData7: Prisma.DirectorBoardCreateInput = {
  aboutMe: proseMirrorData5,
  publicName: managerUserData7.fullName,
  profileImage: 'claudia-lage.png',
  DirectorPosition: { connect: { position: directorPositionData7.position } },
  User: {
    connect: {
      email: managerUserData7.email,
    },
  },
}

export const directorBoardDataArray1: Prisma.DirectorBoardCreateInput[] = [
  directorBoardWithoutUserData1,
  directorBoardWithoutUserData2,
  directorBoardWithoutUserData3,
  directorBoardWithoutUserData4,
  directorBoardWithoutUserData5,
  directorBoardWithoutUserData6,
  directorBoardWithoutUserData7,
]
