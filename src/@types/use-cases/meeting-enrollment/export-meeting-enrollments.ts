import type { Readable } from 'node:stream'
import type { CustomHttpHeader } from '@custom-types/custom/http-header'
import type { ExportMeetingEnrollmentsParamsSchemaType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-params-schema'
import type { ExportMeetingEnrollmentsQuerySchemaType } from '@custom-types/http/schemas/meeting/export-meeting-enrollments-query-schema'

export interface ExportMeetingEnrollmentsUseCaseRequest extends ExportMeetingEnrollmentsQuerySchemaType {
  meetingPublicId: ExportMeetingEnrollmentsParamsSchemaType['publicId']
}

export interface ExportMeetingEnrollmentsUseCaseResponse {
  reportStream: Readable
  filename: string
  contentTypeHeader: CustomHttpHeader
}
