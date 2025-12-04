import type { ReadStream } from 'fs'

export interface GetStatuteUseCaseResponse {
  filename: string
  stream: ReadStream
}
