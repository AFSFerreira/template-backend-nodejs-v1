import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'
import { MEETING_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildMeetingBannerUrl } from '@services/http/url/build-meeting-banner-url'

@RegisterPresenter(MEETING_DETAILED_PRESENTER_KEY)
export class MeetingDetailedPresenter implements IPresenterStrategy<MeetingWithDetails, HTTPMeetingWithDetails> {
  public toHTTP(input: MeetingWithDetails): HTTPMeetingWithDetails {
    return {
      id: input.publicId,
      title: input.title,
      image: buildMeetingBannerUrl(input.image),
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
