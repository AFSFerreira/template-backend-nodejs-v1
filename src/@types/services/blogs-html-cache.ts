import type Redis from 'ioredis'

export interface IGetBlogHTMLCached {
  blogId: number
  redis: Redis
}

export interface ISetBlogHTMLCache {
  blogId: number
  htmlContent: string
  redis: Redis
}
