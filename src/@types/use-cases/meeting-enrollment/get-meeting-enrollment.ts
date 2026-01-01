import type { GetMeetingEnrollmentParamsSchemaType } from '@custom-types/schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'

export interface GetMeetingEnrollmentUseCaseRequest extends GetMeetingEnrollmentParamsSchemaType {}

export interface GetMeetingEnrollmentUseCaseResponse {
  enrollment: MeetingEnrollmentWithDetails
}
