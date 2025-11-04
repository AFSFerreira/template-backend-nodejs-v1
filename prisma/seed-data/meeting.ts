import type { Prisma } from "@prisma/client"

export const meetingData1 = {
  title: 'PRIMEIRA REUNIÃO DE ASTROBIOLOGIA',
  image: 'meeting-2026.jpg',
  description: 'Sunt sit non commodo deserunt duis consectetur nostrud commodo qui duis exercitation cillum reprehenderit. Sunt enim laborum excepteur commodo aute adipisicing. Incididunt incididunt commodo exercitation mollit consectetur occaecat in reprehenderit labore eu. Mollit enim quis enim officia Lorem Lorem esse. Aute ex aute ipsum laboris id magna dolore officia sunt do culpa ad exercitationOfficia magna incididunt commodo nostrud nulla deserunt est ad. Magna incididunt ipsum ut id amet aliquip commodo sit. Magna dolor aliqua consequat deserunt do duis ea commodo sit irure eu nisi. Cillum id nulla enim dolor excepteur nisi laboris amet Lorem. Ea ut voluptate id reprehenderit minim Et enim occaecat ex est reprehenderit aliqua officia exercitation cupidatat est. Quis sunt sunt est deserunt magna esse in exercitation aute ea. Ea excepteur nulla excepteur in fugiat esse do qui. Occaecat culpa est qui elit Lorem ut cillum irure pariatur do excepteur cupidatat laborum eiusmod. Ipsum nulla esse et cupidatat. Duis non est enim ut. Occaecat velit ipsum deserunt ex esse id cupidatat consequat deserunt voluptate dolor aute.',
  location: 'UNIVERSIDADE FEDERAL FLUMINENSE',
  lastDate: new Date('2025-12-31'),
  MeetingDate: {
    create: [
      {
        date: new Date('2025-09-21'),
      },
      {
        date: new Date('2025-09-22'),
      },
      {
        date: new Date('2025-12-31'),
      },
    ],
  },
  MeetingPaymentInfo: {
    create: {
      value: 120.34,
      limitDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      paymentInfoId: 1,
    },
  },
}

export const alreadyFinishedMeetings: Prisma.MeetingCreateInput[] = []

for (let idx = 0; idx < 10; idx++) {
  alreadyFinishedMeetings.push({
    title: `${idx + 1} REUNIÃO FINALIZADA DE ASTROBIOLOGIA`,
  image: 'meeting-2026.jpg',
  description: 'Incididunt sit voluptate aliquip ut fugiat do dolor aliqua nostrud do nulla mollit.',
  location: 'UNIVERSIDADE FEDERAL FLUMINENSE',
  lastDate: new Date('2025-09-31'),
  MeetingDate: {
    create: [
      {
        date: new Date('2025-09-21'),
      },
      {
        date: new Date('2025-09-22'),
      },
      {
        date: new Date('2025-09-31'),
      },
    ],
  },
  MeetingPaymentInfo: {
    create: {
      value: 120.34 + idx,
      limitDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      paymentInfoId: 1,
    },
  }
  })
}
