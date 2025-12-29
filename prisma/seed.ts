import type { AddressState } from '@prisma/client'
import { adapter, pool } from '@lib/prisma/helpers/configuration'
import { PrismaClient } from '@prisma/client'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { activityAreasData1, subActivityAreasData1 } from './seed-data/activity-areas'
import { addressStatesDataArray1 } from './seed-data/address-states'
import { partialAddressDataArray1 } from './seed-data/addresses'
import { blogDataArray1 } from './seed-data/blogs'
import { directorPositionsArray1 } from './seed-data/director-positions'
import { institutionsDataArray1 } from './seed-data/institutions'
import { meetingDataArray1 } from './seed-data/meeting'
import { meetingParticipantsDummyDataArray1 } from './seed-data/meeting-participants'
import { paymentInfo1 } from './seed-data/payment-info'
import { usersDataArray1, usersDataArray2 } from './seed-data/users'

const prisma = new PrismaClient({ adapter })

async function main() {
  // Criando as áreas de atuação:
  await prisma.activityArea.createMany({
    data: [...activityAreasData1, ...subActivityAreasData1],
    skipDuplicates: true,
  })

  // Criando os cargos de diretoria:
  await prisma.directorPosition.createMany({
    data: directorPositionsArray1,
    skipDuplicates: true,
  })

  // Criando as instituções de ensino:
  await prisma.institution.createMany({
    data: institutionsDataArray1,
    skipDuplicates: true,
  })

  // Criando os estados:
  const addressStatesArray: AddressState[] = []

  for (const addressStateInfo of addressStatesDataArray1) {
    let addressState = await prisma.addressState.findFirst({
      where: {
        name: addressStateInfo.name,
      },
    })

    if (!addressState) {
      addressState = await prisma.addressState.create({ data: addressStateInfo })
    }

    addressStatesArray.push(addressState)
  }

  // Criação de Usuários:
  for (const user of [...usersDataArray1, ...usersDataArray2]) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        Address: {
          create: {
            ...getRandomArrayElement(partialAddressDataArray1),
            State: {
              connect: getRandomArrayElement(addressStatesArray),
            },
          },
        },
      },
    })
  }

  // Criação de Blogs Dummy:
  for (const blogInfo of blogDataArray1) {
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
  for (const meeting of meetingDataArray1) {
    const { MeetingDate, MeetingParticipation, MeetingPaymentInfo, ...filteredMeetingInfo } = meeting

    const meetingAlreadyExists = await prisma.meeting.findFirst({
      where: filteredMeetingInfo,
    })

    if (!meetingAlreadyExists) {
      await prisma.meeting.create({
        data: {
          ...meeting,
          MeetingParticipation: { create: meetingParticipantsDummyDataArray1 },
        },
      })
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    // biome-ignore lint/suspicious/noConsole: <Console necessário. Impossível utilizar pino aqui>
    console.error('Erro ao executar seed:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
