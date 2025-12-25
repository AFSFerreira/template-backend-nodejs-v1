import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeeting } from '@custom-types/presenter/meeting/meeting-default'
import type { Meeting } from '@prisma/client'
import { MEETING_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_MEETING_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(MEETING_DEFAULT_PRESENTER_KEY)
export class MeetingDefaultPresenter implements IPresenterStrategy<Meeting, HTTPMeeting> {
  public toHTTP(input: Meeting): HTTPMeeting {
    const backendBaseUrl = getBackendBaseUrl()

    const { id, publicId, createdAt, updatedAt, location, participantsCount, ...filteredInfo } = input

    return {
      ...filteredInfo,
      id: publicId,
      title: input.title,
      image: urlJoin(backendBaseUrl, STATIC_MEETING_BANNERS_IMAGE_ROUTE, input.image),
      description: input.description,
      lastDate: input.lastDate,
    }
  }
}
