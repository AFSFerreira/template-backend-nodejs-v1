import type Redis from 'ioredis'

export interface IGetBlogHTMLCached {
  id: string
  redis: Redis
}

export interface ISetBlogHTMLCache {
  id: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveBlogHTMLCache {
  id: string
  redis: Redis
}
