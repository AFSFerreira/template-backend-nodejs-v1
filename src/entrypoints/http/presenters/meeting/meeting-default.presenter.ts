import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting, MeetingDefaultPresenterInput } from '@custom-types/http/presenter/meeting/meeting-default'
import { MeetingUrlBuilderService } from '@services/builders/urls/build-meeting-banner-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class MeetingDefaultPresenter implements IPresenterStrategy<MeetingDefaultPresenterInput, HTTPMeeting> {
  constructor(
    @inject(MeetingUrlBuilderService)
    private readonly meetingUrlBuilderService: MeetingUrlBuilderService,
  ) {}

  public toHTTP(input: MeetingDefaultPresenterInput): HTTPMeeting {
    return {
      id: input.publicId,
      title: input.title,
      bannerImage: this.meetingUrlBuilderService.buildBannerUrl(input.bannerImage),
      description: input.description,
      lastDate: input.lastDate,
    }
  }

  toHTTPList(inputs: MeetingDefaultPresenterInput[]): HTTPMeeting[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
