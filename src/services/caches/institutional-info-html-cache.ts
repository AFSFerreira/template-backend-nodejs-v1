import { INSTITUTIONAL_INFO_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import {
  GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO,
  SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'
import { injectable } from 'tsyringe'

const INSTITUTIONAL_INFO_HTML_KEY = 'cache:institutionalInfo:aboutDescriptionHtml'

@injectable()
export class InstitutionalInfoHtmlCacheService {
  async get() {
    const key = INSTITUTIONAL_INFO_HTML_KEY
    const htmlCached: string | null = await redis.get(key)

    if (htmlCached) {
      await redis.pexpire(key, INSTITUTIONAL_INFO_HTML_CACHE_TTL)
    }

    logger.info({ key }, GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO)

    return htmlCached
  }

  async set(htmlContent: string) {
    const key = INSTITUTIONAL_INFO_HTML_KEY
    const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', INSTITUTIONAL_INFO_HTML_CACHE_TTL, 'NX')

    if (!wasCached) {
      await redis.pexpire(key, INSTITUTIONAL_INFO_HTML_CACHE_TTL)
    }

    logger.info({ key, wasCached }, SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO)

    return wasCached
  }

  async remove() {
    const key = INSTITUTIONAL_INFO_HTML_KEY
    await redis.del(key)
  }
}
