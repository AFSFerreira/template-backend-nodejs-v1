import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'

@RegisterPresenter(tokens.presenters.meetingDetailed)
export class MeetingDetailedPresenter implements IPresenterStrategy<MeetingWithDetails, HTTPMeetingWithDetails> {
  public toHTTP(input: MeetingWithDetails): HTTPMeetingWithDetails {
    return {
      id: input.publicId,
      title: input.title,
      bannerImage: buildMeetingBannerUrl(input.bannerImage),
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
