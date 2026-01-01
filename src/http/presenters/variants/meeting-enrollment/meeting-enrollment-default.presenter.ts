import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPMeetingEnrollment } from '@custom-types/presenter/meeting-enrollment/meeting-enrollment-default'
import type { MeetingEnrollment } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.meetingEnrollmentDefault)
export class MeetingEnrollmentDefaultPresenter implements IPresenterStrategy<MeetingEnrollment, HTTPMeetingEnrollment> {
  public toHTTP(input: MeetingEnrollment): HTTPMeetingEnrollment {
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      meetingId: input.meetingId,
    }
  }
}
