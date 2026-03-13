import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPMeetingEnrollment,
  MeetingEnrollmentDefaultPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-default'
import { singleton } from 'tsyringe'

@singleton()
export class MeetingEnrollmentDefaultPresenter
  implements IPresenterStrategy<MeetingEnrollmentDefaultPresenterInput, HTTPMeetingEnrollment>
{
  public toHTTP(input: MeetingEnrollmentDefaultPresenterInput): HTTPMeetingEnrollment
  public toHTTP(input: MeetingEnrollmentDefaultPresenterInput[]): HTTPMeetingEnrollment[]
  public toHTTP(
    input: MeetingEnrollmentDefaultPresenterInput | MeetingEnrollmentDefaultPresenterInput[],
  ): HTTPMeetingEnrollment | HTTPMeetingEnrollment[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      meetingId: input.meetingId,
    }
  }
}
