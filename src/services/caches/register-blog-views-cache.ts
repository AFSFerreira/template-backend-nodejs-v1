import type { IRegisterBlogViews } from '@custom-types/services/cache/register-blog-views'
import { BLOG_IP_VIEW_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { BLOG_VISUALIZATION_CACHED } from '@messages/loggings/services/cache'

export async function registerBlogViews({ blogId, ip, redis }: IRegisterBlogViews) {
  const key = `view:blog:${blogId}:userIp:${ip}`
  const blogWasNotRecentlyViewed: 'OK' | null = await redis.set(key, '1', 'PX', BLOG_IP_VIEW_TTL, 'NX')

  logger.info({ blogId, ip, blogWasNotRecentlyViewed }, BLOG_VISUALIZATION_CACHED)

  return blogWasNotRecentlyViewed
}
