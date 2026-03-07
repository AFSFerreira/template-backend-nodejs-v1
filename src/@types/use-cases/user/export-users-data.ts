import type { Readable } from 'node:stream'
import type { CustomHttpHeader } from '@custom-types/custom/http-header'
import type { ExportUsersDataQuerySchemaType } from '@custom-types/http/schemas/user/export-users-data-query-schema'

export interface ExportUsersDataUseCaseRequest extends ExportUsersDataQuerySchemaType {}

export interface ExportUsersDataUseCaseResponse {
  reportStream: Readable
  filename: string
  contentTypeHeader: CustomHttpHeader
}
