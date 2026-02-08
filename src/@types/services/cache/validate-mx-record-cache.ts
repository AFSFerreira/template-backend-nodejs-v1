import type Redis from 'ioredis'

export type MxRecordResult = 'valid' | 'invalid'

export interface IGetMxRecordCached {
  mxRecord: string
  redis: Redis
}

export interface ISetMxRecordCached {
  mxRecord: string
  result: MxRecordResult
  redis: Redis
}
