import type { GetMeetingParticipantsQuerySchemaType } from '@custom-types/schemas/meeting/get-meeting-participants-query-schema'

export interface ListMeetingParticipantsQuery extends GetMeetingParticipantsQuerySchemaType {
  meetingId: number
}
