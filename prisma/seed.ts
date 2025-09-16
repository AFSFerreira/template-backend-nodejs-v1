import { ActivityAreaType, PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { activityAreasData, subActivityAreasData } from './seed-data/activity-areas'
import { blogData } from './seed-data/blogs'
import { dummyUserInfoArray, userData1, userData2 } from './seed-data/users'
import { env } from '../src/env'

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

  const passwordHash = await hash('123456789Az#', env.HASH_SALT_ROUNDS)

  // Criação de Usuário Admin:
  await prisma.user.upsert({
    where: { email: userData1.email },
    update: {},
    create: {
      ...userData1,
      passwordHash,
    },
  })

  // Criação de Usuário Comum:
  await prisma.user.upsert({
    where: { email: userData2.email },
    update: {},
    create: {
      ...userData2,
      passwordHash,
    },
  })

  // Criação de Usuários Dummy:
  for (const userInfo of dummyUserInfoArray) {
    await prisma.user.create({
      data: {
        ...userInfo,
        passwordHash,
      }
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
