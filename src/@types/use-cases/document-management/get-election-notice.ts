import type { ReadStream } from 'fs'

export interface GetElectionNoticeUseCaseResponse {
  filename: string
  stream: ReadStream
}
