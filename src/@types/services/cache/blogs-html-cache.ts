import type Redis from 'ioredis'

export interface IGetBlogHTMLCached {
  publicId: string
  redis: Redis
}

export interface ISetBlogHTMLCache {
  publicId: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveBlogHTMLCache {
  publicId: string
  redis: Redis
}
