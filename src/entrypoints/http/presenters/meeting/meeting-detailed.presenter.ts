import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingWithDetails,
  MeetingDetailedPresenterInput,
} from '@custom-types/http/presenter/meeting/meeting-detailed'
import { MeetingUrlBuilderService } from '@services/builders/urls/build-meeting-banner-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class MeetingDetailedPresenter
  implements IPresenterStrategy<MeetingDetailedPresenterInput, HTTPMeetingWithDetails>
{
  constructor(
    @inject(MeetingUrlBuilderService)
    private readonly meetingUrlBuilderService: MeetingUrlBuilderService,
  ) {}

  public toHTTP(input: MeetingDetailedPresenterInput): HTTPMeetingWithDetails {
    return {
      id: input.publicId,
      title: input.title,
      agenda: this.meetingUrlBuilderService.buildAgendaUrl(input.agenda),
      bannerImage: this.meetingUrlBuilderService.buildBannerUrl(input.bannerImage),
      description: input.description,
      location: input.location,
      lastDate: input.lastDate,
      meetingPaymentInfo: input.MeetingPaymentInfo
        ? {
            code: input.MeetingPaymentInfo.code,
            pixKey: input.MeetingPaymentInfo.pixKey,
            bank: input.MeetingPaymentInfo.bank,
            agency: input.MeetingPaymentInfo.agency,
            account: input.MeetingPaymentInfo.account,
            billingEmail: input.MeetingPaymentInfo.billingEmail,
            value: input.MeetingPaymentInfo.value.toString(),
            limitDate: input.MeetingPaymentInfo.limitDate,
          }
        : undefined,
      meetingDates: input.MeetingDate?.map((meetingDate) => meetingDate.date),
    }
  }

  toHTTPList(inputs: MeetingDetailedPresenterInput[]): HTTPMeetingWithDetails[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
