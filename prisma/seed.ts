import { ActivityAreaType, PrismaClient } from '@prisma/client'
import type { User } from '@prisma/client'
import { activityAreasData1, subActivityAreasData1 } from './seed-data/activity-areas'
import { dummyBlogDataArray } from './seed-data/blogs'
import { directorPositionsArray } from './seed-data/director-positions'
import { directorBoardsArray } from './seed-data/directors-board'
import { institutionsDataArray } from './seed-data/institutions'
import { alreadyFinishedMeetings, meetingData1 } from './seed-data/meeting'
import { paymentInfo1 } from './seed-data/payment-info'
import { dummyUserDirectorBoardInfoArray, dummyUserInfoArray, userData1, userData2 } from './seed-data/users'

const prisma = new PrismaClient()

async function main() {
  const activityAreas = activityAreasData1.map((activityArea) => ({
    area: activityArea,
    type: ActivityAreaType.AREA_OF_ACTIVITY,
  }))

  const subActivityAreas = subActivityAreasData1.map((subActivityArea) => ({
    area: subActivityArea,
    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
  }))

  await prisma.activityArea.createMany({
    data: [...activityAreas, ...subActivityAreas],
    skipDuplicates: true,
  })

  await prisma.directorPosition.createMany({
    data: directorPositionsArray,
    skipDuplicates: true,
  })

  await prisma.institution.createMany({
    data: institutionsDataArray.map((institution) => ({ name: institution })),
    skipDuplicates: true,
  })

  // Criação de Usuário Admin:
  await prisma.user.upsert({
    where: { email: userData1.email },
    update: {},
    create: userData1,
  })

  // Criação de Usuário Manager:
  await prisma.user.upsert({
    where: { email: userData2.email },
    update: {},
    create: userData2,
  })

  // Criação de Usuários Dummy do Corpo Diretivo:
  const dummyDirectorBoardUsers: User[] = []

  for (const dummyUserDirectorBoardInfo of dummyUserDirectorBoardInfoArray) {
    dummyDirectorBoardUsers.push(
      await prisma.user.upsert({
        where: { email: dummyUserDirectorBoardInfo.email },
        update: {},
        create: dummyUserDirectorBoardInfo,
      }),
    )
  }

  // Criação de Usuários Dummy:
  for (const userInfo of dummyUserInfoArray) {
    await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: userInfo,
    })
  }

  // Criação das Informações de Corpo Diretivo:
  for (let i = 0; i < dummyDirectorBoardUsers.length; i++) {
    const dummyDirectorInfo = dummyDirectorBoardUsers[i]
    const dummyDirectorBoardInfo = directorBoardsArray[i]

    const { fullName, linkLattes, ...filteredInfo } = dummyDirectorBoardInfo

    await prisma.directorBoard.upsert({
      where: { userId: dummyDirectorInfo.id },
      update: {},
      create: {
        ...filteredInfo,
        User: { connect: { id: dummyDirectorInfo.id } },
      },
    })
  }

  // let existingBlog = await prisma.blog.findFirst({
  //   where: { title: blogData1.title },
  // })

  // if (!existingBlog) {
  //   existingBlog = await prisma.blog.create({
  //     data: blogData1,
  //   })
  // }

  // Criação de Blogs Dummy:
  for (const blogInfo of dummyBlogDataArray) {
    const existingBlog = await prisma.blog.findFirst({
      where: { title: blogInfo.title },
    })

    if (!existingBlog) {
      await prisma.blog.create({
        data: blogInfo,
      })
    }
  }

  // Criando Informações Bancárias:
  await prisma.paymentInfo.upsert({
    where: { id: 1 },
    update: {},
    create: paymentInfo1,
  })

  // Criação de Reuniões:
  const meetingAlreadyExists = await prisma.meeting.findFirst({
    where: {
      title: meetingData1.title,
    },
  })

  if (!meetingAlreadyExists) {
    await prisma.meeting.create({
      data: meetingData1,
    })
  }

  for (const finishedMeeting of alreadyFinishedMeetings) {
    const finishedMeetingAlreadyExists = await prisma.meeting.findFirst({
      where: {
        title: finishedMeeting.title,
      },
    })

    if (!finishedMeetingAlreadyExists) {
      await prisma.meeting.create({
        data: finishedMeeting,
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error('Erro ao executar seed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
