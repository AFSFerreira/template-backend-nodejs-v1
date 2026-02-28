import type Redis from 'ioredis'

export interface IGetNewsletterHTMLCached {
  newsletterId: number
  redis: Redis
}

export interface ISetNewsletterHTMLCache {
  newsletterId: number
  htmlContent: string
  redis: Redis
}

export interface IRemoveNewsletterHTMLCache {
  newsletterId: number
  redis: Redis
}
