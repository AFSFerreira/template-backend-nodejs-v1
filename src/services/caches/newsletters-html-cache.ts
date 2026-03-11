import { NEWSLETTER_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { GET_NEWSLETTER_HTML_CACHED_INFO, SET_NEWSLETTER_HTML_CACHE_INFO } from '@messages/loggings/services/cache'
import { injectable } from 'tsyringe'

const generateNewsletterHtmlKey = (publicId: string) => `cache:newsletter:${publicId}:contentHtml`

@injectable()
export class NewsletterHtmlCacheService {
  async get(publicId: string) {
    const key = generateNewsletterHtmlKey(publicId)
    const htmlCached: string | null = await redis.get(key)

    if (htmlCached) {
      await redis.pexpire(key, NEWSLETTER_HTML_CACHE_TTL)
    }

    logger.info({ key }, GET_NEWSLETTER_HTML_CACHED_INFO)

    return htmlCached
  }

  async set(publicId: string, htmlContent: string) {
    const key = generateNewsletterHtmlKey(publicId)
    const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', NEWSLETTER_HTML_CACHE_TTL, 'NX')

    if (!wasCached) {
      await redis.pexpire(key, NEWSLETTER_HTML_CACHE_TTL)
    }

    logger.info({ key, wasCached }, SET_NEWSLETTER_HTML_CACHE_INFO)

    return wasCached
  }

  async remove(publicId: string) {
    const key = generateNewsletterHtmlKey(publicId)
    await redis.del(key)
  }
}
