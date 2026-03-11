import { BLOG_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { GET_BLOG_HTML_CACHED_INFO, SET_BLOG_CACHE_INFO } from '@messages/loggings/services/cache'
import { injectable } from 'tsyringe'

const generateBlogHtmlKey = (publicId: string) => `cache:blog:${publicId}:contentHtml`

@injectable()
export class BlogHtmlCacheService {
  async get(publicId: string) {
    const key = generateBlogHtmlKey(publicId)
    const htmlCached: string | null = await redis.get(key)

    if (htmlCached) {
      await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
    }

    logger.info({ key }, GET_BLOG_HTML_CACHED_INFO)

    return htmlCached
  }

  async set(publicId: string, htmlContent: string) {
    const key = generateBlogHtmlKey(publicId)
    const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', BLOG_HTML_CACHE_TTL, 'NX')

    if (!wasCached) {
      await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
    }

    logger.info({ key, wasCached }, SET_BLOG_CACHE_INFO)

    return wasCached
  }

  async remove(publicId: string) {
    const key = generateBlogHtmlKey(publicId)
    await redis.del(key)
  }
}
