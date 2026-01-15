import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingWithDetails } from '@custom-types/http/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export class MeetingDetailedPresenter implements IPresenterStrategy<MeetingWithDetails, HTTPMeetingWithDetails> {
  public toHTTP(input: MeetingWithDetails): HTTPMeetingWithDetails {
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
