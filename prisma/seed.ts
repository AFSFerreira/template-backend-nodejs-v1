import { ActivityAreaType, PrismaClient } from '@prisma/client'
import { activityAreasData, subActivityAreasData } from './seed-data/activity-areas'
import { blogData, dummyBlogDataArray } from './seed-data/blogs'
import { meetingData1 } from './seed-data/meeting'
import { paymentInfo } from './seed-data/payment-info'
import { dummyUserInfoArray, userData1, userData2 } from './seed-data/users'

const prisma = new PrismaClient()

async function main() {
  const activityAreas = activityAreasData.map((activityArea) => ({
    area: activityArea,
    type: ActivityAreaType.AREA_OF_ACTIVITY,
  }))

  const subActivityAreas = subActivityAreasData.map((subActivityArea) => ({
    area: subActivityArea,
    type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
  }))

  await prisma.activityArea.createMany({
    data: [...activityAreas, ...subActivityAreas],
    skipDuplicates: true,
  })

  // Criação de Usuário Admin:
  await prisma.user.upsert({
    where: { email: userData1.email },
    update: {},
    create: userData1,
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
    where: { title: blogData.title },
  })

  if (!existingBlog) {
    existingBlog = await prisma.blog.create({
      data: blogData,
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
    create: paymentInfo,
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
