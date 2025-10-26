import { ActivityAreaType, PrismaClient } from '@prisma/client'
import { activityAreasData1, subActivityAreasData1 } from './seed-data/activity-areas'
import { blogData1, dummyBlogDataArray } from './seed-data/blogs'
import { directorPositionData1 } from './seed-data/director-positions'
import { directorBoardData1 } from './seed-data/directors-board'
import { meetingData1 } from './seed-data/meeting'
import { paymentInfo1 } from './seed-data/payment-info'
import { dummyUserInfoArray, userData1, userData2 } from './seed-data/users'

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

  await prisma.directorPosition.upsert({
    where: { position: directorPositionData1.position },
    update: {},
    create: directorPositionData1,
  })

  // Criação de Usuário Admin:
  const admin = await prisma.user.upsert({
    where: { email: userData1.email },
    update: {},
    create: userData1,
  })

  // Criação das Informações de Corpo Diretivo:
  await prisma.directorBoard.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      ...directorBoardData1,
      User: {
        connect: { id: admin.id },
      },
    },
  })

  // Criação de Usuário Comum:
  await prisma.user.upsert({
    where: { email: userData2.email },
    update: {},
    create: userData2,
  })

  // Criação de Usuários Dummy:
  for (const userInfo of dummyUserInfoArray) {
    await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {},
      create: userInfo,
    })
  }

  let existingBlog = await prisma.blog.findFirst({
    where: { title: blogData1.title },
  })

  if (!existingBlog) {
    existingBlog = await prisma.blog.create({
      data: blogData1,
    })
  }

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
