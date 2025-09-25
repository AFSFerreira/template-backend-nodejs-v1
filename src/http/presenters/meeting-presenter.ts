import type { MeetingWithDetails } from '@custom-types/meeting-with-details'
import type { Meeting } from '@prisma/client'

interface HTTPMeeting {
  id: string
  title: string
  image: string
  description: string
  lastDate: Date
}

interface HTTPMeetingPaymentInfo {
  code: string
  pixKey: string
  bank: string
  agency: string
  account: string
  value: string
  limitDate: Date
}

interface HTTPMeetingWithDetails extends HTTPMeeting {
  location: string
  meetingPaymentInfo: HTTPMeetingPaymentInfo
  meetingDates: Date[]
}

export class MeetingPresenter {
  static toHTTP(meeting: Meeting): HTTPMeeting
  static toHTTP(meetings: Meeting[]): HTTPMeeting[]
  static toHTTP(input: Meeting | Meeting[]): HTTPMeeting | HTTPMeeting[] {
    if (Array.isArray(input)) {
      return input.map((meeting) => MeetingPresenter.toHTTP(meeting))
    }

    const { id, publicId, createdAt, updatedAt, location, participantsCount, ...filteredInfo } = input

    return {
      ...filteredInfo,
      id: publicId,
      title: input.title,
      image: input.image,
      description: input.description,
      lastDate: input.lastDate,
    }
  }

  static toHTTPDetailed(meeting: MeetingWithDetails): HTTPMeetingWithDetails
  static toHTTPDetailed(meetings: MeetingWithDetails[]): HTTPMeetingWithDetails[]
  static toHTTPDetailed(
    input: MeetingWithDetails | MeetingWithDetails[],
  ): HTTPMeetingWithDetails | HTTPMeetingWithDetails[] {
    if (Array.isArray(input)) {
      return input.map((meeting) => MeetingPresenter.toHTTPDetailed(meeting))
    }

    return {
      id: input.publicId,
      title: input.title,
      image: input.image,
      description: input.description,
      location: input.location,
      lastDate: input.lastDate,
      meetingPaymentInfo: {
        code: input.MeetingPaymentInfo.PaymentInfo.code,
        pixKey: input.MeetingPaymentInfo.PaymentInfo.pixKey,
        bank: input.MeetingPaymentInfo.PaymentInfo.bank,
        agency: input.MeetingPaymentInfo.PaymentInfo.agency,
        account: input.MeetingPaymentInfo.PaymentInfo.account,
        value: input.MeetingPaymentInfo.value.toString(),
        limitDate: input.MeetingPaymentInfo.limitDate,
      },
      meetingDates: input.MeetingDate.map((date) => date.date),
    }
  }
}
