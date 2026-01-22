import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'

export class MeetingDetailedPresenter
  implements IPresenterStrategy<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>
{
  public toHTTP(input: MeetingDetailedPresenterInput): HTTPMeetingWithDetails {
    return {
      id: input.publicId,
      title: input.title,
      agenda: input.agenda,
      bannerImage: input.bannerImage,
      description: input.description,
      location: input.location,
      lastDate: input.lastDate,
      meetingPaymentInfo: input.MeetingPaymentInfo
        ? {
            code: input.MeetingPaymentInfo.PaymentInfo.code,
            pixKey: input.MeetingPaymentInfo.PaymentInfo.pixKey,
            bank: input.MeetingPaymentInfo.PaymentInfo.bank,
            agency: input.MeetingPaymentInfo.PaymentInfo.agency,
            account: input.MeetingPaymentInfo.PaymentInfo.account,
            value: input.MeetingPaymentInfo.value.toString(),
            limitDate: input.MeetingPaymentInfo.limitDate,
          }
        : undefined,
      meetingDates: input.MeetingDate?.map((meetingDate) => meetingDate.date),
    }
  }
}
