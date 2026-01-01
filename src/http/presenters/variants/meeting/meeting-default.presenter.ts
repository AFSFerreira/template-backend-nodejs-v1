import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting } from '@custom-types/presenter/meeting/meeting-default'
import type { Meeting } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildMeetingBannerUrl } from '@services/builders/urls/build-meeting-banner-url'

@RegisterPresenter(tokens.presenters.meetingDefault)
export class MeetingDefaultPresenter implements IPresenterStrategy<Meeting, HTTPMeeting> {
  public toHTTP(input: Meeting): HTTPMeeting {
    const { id, publicId, createdAt, updatedAt, location, participantsCount, ...filteredInfo } = input

    return {
      ...filteredInfo,
      id: publicId,
      title: input.title,
      bannerImage: buildMeetingBannerUrl(input.bannerImage),
      description: input.description,
      lastDate: input.lastDate,
    }
  }
}
