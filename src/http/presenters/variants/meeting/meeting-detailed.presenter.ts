import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingWithDetails } from '@custom-types/presenter/meeting/meeting-detailed'
import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'
import { MEETING_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_MEETING_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(MEETING_DETAILED_PRESENTER_KEY)
export class MeetingDetailedPresenter implements IPresenterStrategy<MeetingWithDetails, HTTPMeetingWithDetails> {
  public toHTTP(input: MeetingWithDetails): HTTPMeetingWithDetails {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      title: input.title,
      image: urlJoin(backendBaseUrl, STATIC_MEETING_BANNERS_IMAGE_ROUTE, input.image),
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
