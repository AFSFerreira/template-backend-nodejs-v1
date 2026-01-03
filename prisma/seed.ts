import type { AddressState, Meeting, User } from '@prisma/client'
import { adapter, pool } from '@lib/prisma/helpers/configuration'
import { PrismaClient } from '@prisma/client'
import { getRandomArrayElement } from '@utils/generics/get-random-array-element'
import { activityAreasData1, subActivityAreasData1 } from './seed-data/activity-areas'
import { addressStatesDataArray1 } from './seed-data/address-states'
import { partialAddressDataArray1 } from './seed-data/addresses'
import { blogDataArray1 } from './seed-data/blogs'
import { directorPositionsArray1 } from './seed-data/director-positions'
import { directorBoardWithoutUserDataArray1 } from './seed-data/directors-board'
import { institutionsDataArray1 } from './seed-data/institutions'
import { meetingEnrollmentDataArray1 } from './seed-data/meeting-enrollments'
import { meetingPresentationNestedMeetingEnrollmentDataArray1 } from './seed-data/meeting-presentations'
import { meetingDataArray1 } from './seed-data/meetings'
import { newsletterDataArray1 } from './seed-data/newsletter'
import { paymentInfo1 } from './seed-data/payments-info'
import { sliderImageDataArray1 } from './seed-data/slider-image'
import { usersDataArray1, usersDataArray2, usersDataArray3 } from './seed-data/users'
import { institutionalInfoData1 } from './seed-data/institutional-info'

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

  // Lista de Usuários Criados para Utilizar Posteriormente:
  const createdUsers: User[] = []

  // Criação de Usuários:
  for (const user of [...usersDataArray1, ...usersDataArray2, ...usersDataArray3]) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        DirectorBoard: {
          create: directorBoardWithoutUserDataArray1.find(
            (directorBoard) => directorBoard.publicName === user.fullName,
          ),
        },
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

    createdUsers.push(createdUser)
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

  const createdMeetings: Meeting[] = []

  // Criação de Reuniões:
  for (const meetingInfo of meetingDataArray1) {
    const { MeetingDate, MeetingPaymentInfo, MeetingEnrollment, ...filteredMeetingInfo } = meetingInfo

    let meeting = await prisma.meeting.findFirst({
      where: filteredMeetingInfo,
    })

    if (!meeting) {
      meeting = await prisma.meeting.create({ data: meetingInfo })
    }

    createdMeetings.push(meeting)
  }

  // Criação de Inscrições de Convidados em Reuniões:
  for (const createdMeetingInfo of createdMeetings) {
    for (const meetingEnrollmentInfo of meetingEnrollmentDataArray1) {
      await prisma.meetingEnrollment.create({
        data: {
          ...meetingEnrollmentInfo,
          Meeting: {
            connect: {
              id: createdMeetingInfo.id,
            },
          },
        },
      })
    }
  }

  // Criação de Inscrições de Convidados em Reuniões:
  for (const createdMeetingInfo of createdMeetings) {
    for (const createdUserInfo of createdUsers) {
      await prisma.meetingEnrollment.create({
        data: {
          Meeting: {
            connect: {
              id: createdMeetingInfo.id,
            },
          },
          UserDetails: {
            create: {
              User: {
                connect: {
                  id: createdUserInfo.id,
                },
              },
            },
          },
          MeetingPresentation: getRandomArrayElement(meetingPresentationNestedMeetingEnrollmentDataArray1),
        },
      })
    }
  }

  // Criação de Imagens do Carrossel:
  await prisma.sliderImage.createMany({
    data: sliderImageDataArray1,
    skipDuplicates: true,
  })

  // Criação de Newsletters:
  await prisma.newsletter.createMany({
    data: newsletterDataArray1,
    skipDuplicates: true,
  })

  // Criação das Informações Institucionais:
  await prisma.institutionalInfo.createMany({
    data: institutionalInfoData1,
    skipDuplicates: true,
  })
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
