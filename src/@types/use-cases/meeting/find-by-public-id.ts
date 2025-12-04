import type { MeetingWithDetails } from '@custom-types/validator/meeting-with-details'

export interface FindMeetingByPublicIdUseCaseRequest {
  publicId: string
}

export interface FindMeetingByPublicIdUseCaseResponse {
  meeting: MeetingWithDetails
}
