import type Redis from 'ioredis'

export interface IGetInstitutionalInfoHTMLCached {
  institutionalInfoId: number
  redis: Redis
}

export interface ISetInstitutionalInfoHTMLCache {
  institutionalInfoId: number
  htmlContent: string
  redis: Redis
}

export interface IRemoveInstitutionalInfoHTMLCache {
  institutionalInfoId: number
  redis: Redis
}
