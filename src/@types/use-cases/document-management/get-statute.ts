import type { ReadStream } from 'fs-extra'

export interface GetStatuteUseCaseResponse {
  filename: string
  stream: ReadStream
}
