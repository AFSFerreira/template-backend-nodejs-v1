import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting } from '@custom-types/http/presenter/meeting/meeting-default'
import type { Meeting } from '@prisma/client'

export class MeetingDefaultPresenter implements IPresenterStrategy<Meeting, HTTPMeeting> {
  public toHTTP(input: Meeting): HTTPMeeting {
    const { id, publicId, createdAt, updatedAt, location, participantsCount, ...filteredInfo } = input

    return {
      ...filteredInfo,
      id: publicId,
      title: input.title,
      bannerImage: input.bannerImage,
      description: input.description,
      lastDate: input.lastDate,
    }
  }
}
