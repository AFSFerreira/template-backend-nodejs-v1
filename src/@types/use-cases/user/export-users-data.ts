import type { Readable } from 'node:stream'

export interface ExportUsersDataUseCaseResponse {
  usersCSVInfo: Readable
}
