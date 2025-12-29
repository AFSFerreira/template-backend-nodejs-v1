import type { Prisma } from '@prisma/client'
import { meetingPaymentInfoNestedMeetingData1 } from './meeting-payment-info'

export const meetingData1: Prisma.MeetingCreateInput = {
  title: `I REUNIÃO ANUAL`,
  image: 'meeting-2018.png',
  description: '',
  programFile: '',
  location: 'Universidade Cruzeiro do Sul - Campus Anália Franco',
  lastDate: new Date('2018-07-12'),
  MeetingDate: {
    create: [
      {
        date: new Date('2018-07-11'),
      },
      {
        date: new Date('2018-07-12'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData2: Prisma.MeetingCreateInput = {
  title: `II REUNIÃO ANUAL`,
  image: 'meeting-2019.png',
  description: '',
  programFile: '',
  location: 'Instituto de Astronomia, Geofísica e Ciências Atmosféricas - Universidade de São Paulo',
  lastDate: new Date('2019-10-18'),
  MeetingDate: {
    create: [
      {
        date: new Date('2019-10-17'),
      },
      {
        date: new Date('2019-10-18'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData4: Prisma.MeetingCreateInput = {
  title: `IV REUNIÃO ANUAL`,
  image: 'meeting-2021.png',
  description: '',
  programFile: '',
  location: 'Evento Online',
  lastDate: new Date('2021-11-26'),
  MeetingDate: {
    create: [
      {
        date: new Date('2021-11-25'),
      },
      {
        date: new Date('2021-11-26'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData5: Prisma.MeetingCreateInput = {
  title: `V REUNIÃO ANUAL`,
  image: 'meeting-2022.png',
  description: '',
  programFile: '',
  location: 'Rio de Janeiro',
  lastDate: new Date('2022-11-18'),
  MeetingDate: {
    create: [
      {
        date: new Date('2022-11-16'),
      },
      {
        date: new Date('2022-11-17'),
      },
      {
        date: new Date('2022-11-18'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData6: Prisma.MeetingCreateInput = {
  title: `VI REUNIÃO ANUAL`,
  image: 'meeting-2023.png',
  description: '',
  programFile: '',
  location: 'Campus Butantã, Cidade Universitária, USP - São Paulo',
  lastDate: new Date('2023-12-08'),
  MeetingDate: {
    create: [
      {
        date: new Date('2023-12-07'),
      },
      {
        date: new Date('2023-12-08'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData7: Prisma.MeetingCreateInput = {
  title: `VII REUNIÃO ANUAL`,
  image: 'meeting-2024.png',
  description: '',
  programFile: '',
  location: 'Observatório Nacional, Rio de Janeiro',
  lastDate: new Date('2024-09-06'),
  MeetingDate: {
    create: [
      {
        date: new Date('2024-09-04'),
      },
      {
        date: new Date('2024-09-05'),
      },
      {
        date: new Date('2024-09-06'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingData8: Prisma.MeetingCreateInput = {
  title: 'VIII REUNIÃO ANUAL',
  image: 'meeting-2025.png',
  programFile: '',
  description:
    'A Sociedade Brasileira de Astrobiologia (SBA) tem o prazer de anunciar a realização da sua 8ª Reunião Anual. Este evento consolidado tornou-se o principal ponto de encontro para pesquisadores, estudantes e profissionais dedicados a compreender a origem, evolução, distribuição e o futuro da vida no universo. Nesta 8ª edição, buscaremos fortalecer ainda mais a colaboração interdisciplinar que define nossa área, unindo Astronomia, Biologia, Geologia, Química e Ciências Humanas. A reunião será um espaço vital para apresentar novas descobertas, discutir desafios metodológicos e fomentar novas parcerias no cenário científico brasileiro e internacional.',
  location: 'Instituto Oceanográfico - USP - São Paulo',
  lastDate: new Date('2025-11-14'),
  MeetingDate: {
    create: [
      {
        date: new Date('2025-11-13'),
      },
      {
        date: new Date('2025-11-14'),
      },
    ],
  },
  MeetingPaymentInfo: meetingPaymentInfoNestedMeetingData1,
}

export const meetingDataArray1: Prisma.MeetingCreateInput[] = [
  meetingData1,
  meetingData2,
  meetingData4,
  meetingData5,
  meetingData6,
  meetingData7,
  meetingData8,
]

// for (let idx = 0; idx < 10; idx++) {
//   alreadyFinishedMeetings.push({
//     title: `${idx + 1} REUNIÃO FINALIZADA DE ASTROBIOLOGIA`,
//     image: 'meeting-2025.png',
//     description: 'Incididunt sit voluptate aliquip ut fugiat do dolor aliqua nostrud do nulla mollit.',
//     location: 'UNIVERSIDADE FEDERAL FLUMINENSE',
//     lastDate: new Date('2025-09-31'),
//     MeetingDate: {
//       create: [
//         {
//           date: new Date('2025-09-21'),
//         },
//         {
//           date: new Date('2025-09-22'),
//         },
//         {
//           date: new Date('2025-09-31'),
//         },
//       ],
//     },
//     MeetingPaymentInfo: {
//       create: {
//         value: 120.34 + idx,
//         limitDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
//         paymentInfoId: 1,
//       },
//     },
//   })
// }
