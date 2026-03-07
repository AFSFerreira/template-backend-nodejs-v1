import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting, MeetingDefaultPresenterInput } from '@custom-types/http/presenter/meeting/meeting-default'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'

export class MeetingDefaultPresenter implements IPresenterStrategy<MeetingDefaultPresenterInput, HTTPMeeting> {
  public toHTTP(input: MeetingDefaultPresenterInput): HTTPMeeting {
    return {
      id: input.publicId,
      title: input.title,
      bannerImage: buildMeetingBannerUrl(input.bannerImage),
      description: input.description,
      lastDate: input.lastDate,
    }
  }
}
