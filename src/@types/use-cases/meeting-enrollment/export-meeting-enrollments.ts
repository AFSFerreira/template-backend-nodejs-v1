import type { Readable } from 'node:stream'

export interface ExportMeetingEnrollmentsUseCaseRequest {
  meetingPublicId: string
}

export interface ExportMeetingEnrollmentsUseCaseResponse {
  reportStream: Readable
  filename: string
}
