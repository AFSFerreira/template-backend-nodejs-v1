import type { Prisma } from '@prisma/client'

const paymentInfo = {
  create: {
    value: 120.34,
    limitDate: new Date((new Date('2025-11-14')).getTime() + 1000 * 60 * 60 * 24),
    PaymentInfo: {
      connect: { id: 1 }
    }
  }
}

export const meetingData1 = {
  title: 'VIII REUNIÃO ANUAL',
  image: 'meeting-2025.png',
  description:
    '',
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
  MeetingPaymentInfo: paymentInfo,
}

export const alreadyFinishedMeetings: Prisma.MeetingCreateInput[] = [
  {
    title: `I REUNIÃO ANUAL`,
    image: 'meeting-2018.png',
    description: '',
    location: 'Universidade Cruzeiro do Sul - Campus Anália Franco',
    lastDate: new Date('2018-07-12'),
    MeetingDate: {
      create: [
        {
          date: new Date('2018-07-11'),
        },
        {
          date: new Date('2018-07-12'),
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
  {
    title: `II REUNIÃO ANUAL`,
    image: 'meeting-2019.png',
    description: '',
    location: 'Instituto de Astronomia, Geofísica e Ciências Atmosféricas - Universidade de São Paulo',
    lastDate: new Date('2019-10-18'),
    MeetingDate: {
      create: [
        {
          date: new Date('2019-10-17'),
        },
        {
          date: new Date('2019-10-18'),
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
  {
    title: `IV REUNIÃO ANUAL`,
    image: 'meeting-2021.png',
    description: '',
    location: 'Evento Online',
    lastDate: new Date('2021-11-26'),
    MeetingDate: {
      create: [
        {
          date: new Date('2021-11-25'),
        },
        {
          date: new Date('2021-11-26'),
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
  {
    title: `V REUNIÃO ANUAL`,
    image: 'meeting-2022.png',
    description: '',
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
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
  {
    title: `VI REUNIÃO ANUAL`,
    image: 'meeting-2023.png',
    description: '',
    location: 'Campus Butantã, Cidade Universitária, USP - São Paulo',
    lastDate: new Date('2023-12-08'),
    MeetingDate: {
      create: [
        {
          date: new Date('2023-12-07'),
        },
        {
          date: new Date('2023-12-08'),
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
  {
    title: `VII REUNIÃO ANUAL`,
    image: 'meeting-2024.png',
    description: '',
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
        }
      ],
    },
    MeetingPaymentInfo: paymentInfo,
  },
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
