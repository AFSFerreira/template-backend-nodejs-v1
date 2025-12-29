import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingParticipationDetailed,
  MeetingParticipationPresenterInput,
} from '@custom-types/presenter/meeting-participation/meeting-participation-detailed'
import { MEETING_PARTICIPATION_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(MEETING_PARTICIPATION_DETAILED_PRESENTER_KEY)
export class MeetingParticipationDetailedPresenter
  implements IPresenterStrategy<MeetingParticipationPresenterInput, HTTPMeetingParticipationDetailed>
{
  public toHTTP(input: MeetingParticipationPresenterInput): HTTPMeetingParticipationDetailed {
    return {
      createdAt: input.createdAt,
      user: input.User
        ? {
            id: input.User.publicId,
            fullName: input.User.fullName,
            email: input.User.email,
            educationLevel: input.User.educationLevel,
            profileImage: input.User.profileImage,
            occupation: input.User.occupation,
            wantsNewsletter: input.User.wantsNewsletter,
          }
        : null,
      guest: input.Guest
        ? {
            fullName: input.Guest.fullName,
            email: input.Guest.email,
            institutionName: input.Guest.institutionName,
            departmentName: input.Guest.departmentName,
            occupation: input.Guest.occupation,
            educationLevel: input.Guest.educationLevel,
            wantsNewsletter: input.Guest.wantsNewsletter,
          }
        : null,
    }
  }
}
