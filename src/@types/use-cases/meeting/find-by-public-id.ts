import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'

export interface FindMeetingByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindMeetingByPublicIdUseCaseResponse {
  meeting: MeetingWithDetails
}
