import type Redis from 'ioredis'

export interface IRegisterBlogViews {
  blogId: number
  ip: string
  redis: Redis
}
