import { BLOG_IP_VIEW_TTL } from '@constants/redis-configuration-constants'
import type Redis from 'ioredis'

export async function registerBlogViews(blogId: number, ip: string, redis: Redis) {
  const key = `view:blog:${blogId}:userIp:${ip}`
  const blogWasNotRecentlyViewed = await redis.set(key, '1', 'EX', BLOG_IP_VIEW_TTL, 'NX')

  return blogWasNotRecentlyViewed
}
