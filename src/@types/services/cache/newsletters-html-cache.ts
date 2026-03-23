import type Redis from 'ioredis'

export interface IGetNewsletterHTMLCached {
  id: string
  redis: Redis
}

export interface ISetNewsletterHTMLCache {
  id: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveNewsletterHTMLCache {
  id: string
  redis: Redis
}
