import type { Readable } from 'node:stream'

export interface ExportMeetingEnrollmentsUseCaseRequest {}

export interface ExportMeetingEnrollmentsUseCaseResponse {
  reportStream: Readable
  filename: string
}
