import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollment,
  MeetingEnrollmentDefaultPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-default'

export class MeetingEnrollmentDefaultPresenter
  implements IPresenterStrategy<MeetingEnrollmentDefaultPresenterInput, HTTPMeetingEnrollment>
{
  public toHTTP(input: MeetingEnrollmentDefaultPresenterInput): HTTPMeetingEnrollment {
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      meetingId: input.meetingId,
    }
  }
}
