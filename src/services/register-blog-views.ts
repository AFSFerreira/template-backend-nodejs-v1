import { BLOG_IP_VIEW_TTL } from '@constants/redis-configuration-constants'
import type Redis from 'ioredis'

interface IRegisterBlogViews {
  blogId: number
  ip: string
  redis: Redis
}

export async function registerBlogViews({ blogId, ip, redis }: IRegisterBlogViews) {
  const key = `view:blog:${blogId}:userIp:${ip}`
  const blogWasNotRecentlyViewed: 'OK' | null = await redis.set(key, '1', 'PX', BLOG_IP_VIEW_TTL, 'NX')

  return blogWasNotRecentlyViewed
}
