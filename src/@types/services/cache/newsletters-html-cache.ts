import type Redis from 'ioredis'

export interface IGetNewsletterHTMLCached {
  publicId: string
  redis: Redis
}

export interface ISetNewsletterHTMLCache {
  publicId: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveNewsletterHTMLCache {
  publicId: string
  redis: Redis
}
