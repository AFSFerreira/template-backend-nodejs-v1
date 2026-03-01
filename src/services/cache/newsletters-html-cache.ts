import type {
  IGetNewsletterHTMLCached,
  IRemoveNewsletterHTMLCache,
  ISetNewsletterHTMLCache,
} from '@custom-types/services/cache/newsletters-html-cache'
import { NEWSLETTER_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { GET_NEWSLETTER_HTML_CACHED_INFO, SET_NEWSLETTER_HTML_CACHE_INFO } from '@messages/loggings/services/cache'

const generateNewsletterHtmlKey = (publicId: string) => `cache:newsletter:${publicId}:contentHtml`

export async function getNewsletterHTMLCached({ publicId, redis }: IGetNewsletterHTMLCached) {
  const key = generateNewsletterHtmlKey(publicId)
  const htmlCached: string | null = await redis.get(key)

  if (htmlCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, NEWSLETTER_HTML_CACHE_TTL)
  }

  logger.info({ key }, GET_NEWSLETTER_HTML_CACHED_INFO)

  return htmlCached
}

export async function setNewsletterHTMLCache({ publicId, htmlContent, redis }: ISetNewsletterHTMLCache) {
  const key = generateNewsletterHtmlKey(publicId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', NEWSLETTER_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, NEWSLETTER_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_NEWSLETTER_HTML_CACHE_INFO)

  return wasCached
}

export async function removeNewsletterHTMLCache({ publicId, redis }: IRemoveNewsletterHTMLCache) {
  const key = generateNewsletterHtmlKey(publicId)
  await redis.del(key)
}
