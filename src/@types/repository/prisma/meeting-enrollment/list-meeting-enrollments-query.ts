import type { GetMeetingParticipantsQuerySchemaType } from '@custom-types/http/schemas/meeting/get-meeting-participants-query-schema'

export interface ListMeetingEnrollmentsQuery extends GetMeetingParticipantsQuerySchemaType {
  meetingId: number
}
