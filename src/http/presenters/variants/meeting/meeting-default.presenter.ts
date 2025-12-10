import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting } from '@custom-types/presenter/meeting/meeting-default'
import type { Meeting } from '@prisma/client'
import { MEETING_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(MEETING_DEFAULT_PRESENTER_KEY)
export class MeetingDefaultPresenter implements IPresenterStrategy<Meeting, HTTPMeeting> {
  public toHTTP(input: Meeting): HTTPMeeting {
    const { id, publicId, createdAt, updatedAt, location, participantsCount, ...filteredInfo } = input

    return {
      ...filteredInfo,
      id: publicId,
      title: input.title,
      image: input.image,
      description: input.description,
      lastDate: input.lastDate,
    }
  }
}
