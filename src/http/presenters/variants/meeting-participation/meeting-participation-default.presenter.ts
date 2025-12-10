import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingParticipation } from '@custom-types/presenter/meeting-participation/meeting-participation-default'
import type { MeetingParticipation } from '@prisma/client'
import { MEETING_PARTICIPATION_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(MEETING_PARTICIPATION_DEFAULT_PRESENTER_KEY)
export class InstitutionDefaultPresenter implements IPresenterStrategy<MeetingParticipation, HTTPMeetingParticipation> {
  public toHTTP(input: MeetingParticipation): HTTPMeetingParticipation {
    return {
      createdAt: input.createdAt,
      userId: input.userId,
      guestId: input.guestId,
      meetingId: input.meetingId,
    }
  }
}
