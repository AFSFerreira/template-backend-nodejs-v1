import type Redis from 'ioredis'

export interface IGetInstitutionalInfoHTMLCached {
  redis: Redis
}

export interface ISetInstitutionalInfoHTMLCache {
  htmlContent: string
  redis: Redis
}

export interface IRemoveInstitutionalInfoHTMLCache {
  redis: Redis
}
