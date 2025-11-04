export const meetingData1 = {
  title: 'PRIMEIRA REUNIÃO DE ASTROBIOLOGIA',
  image: 'meeting-2026.jpg',
  description: 'Incididunt sit voluptate aliquip ut fugiat do dolor aliqua nostrud do nulla mollit.',
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
