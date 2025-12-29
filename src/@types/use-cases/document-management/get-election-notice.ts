import type { ReadStream } from 'fs-extra'

export interface GetElectionNoticeUseCaseResponse {
  filename: string
  stream: ReadStream
}
