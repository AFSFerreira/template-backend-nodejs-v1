import type {
  HTTPMeetingEnrollment,
  MeetingEnrollmentDefaultPresenterInput,
} from '@custom-types/http/presenter/meeting-enrollment/meeting-enrollment-default'

export const MeetingEnrollmentDefaultPresenter = {
  toHTTP(input: MeetingEnrollmentDefaultPresenterInput): HTTPMeetingEnrollment {
    return {
      id: input.publicId,
      createdAt: input.createdAt,
      meetingId: input.meetingId,
    }
  },

  toHTTPList(inputs: MeetingEnrollmentDefaultPresenterInput[]): HTTPMeetingEnrollment[] {
    return inputs.map(this.toHTTP)
  },
}
