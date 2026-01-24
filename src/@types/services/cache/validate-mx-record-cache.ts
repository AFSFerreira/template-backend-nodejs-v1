import type Redis from 'ioredis'

export interface IGetMxRecordCached {
  mxRecord: string
  redis: Redis
}

export interface ISetMxRecordCached {
  mxRecord: string
  redis: Redis
}
