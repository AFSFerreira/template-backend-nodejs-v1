import type {
  IGetInstitutionalInfoHTMLCached,
  IRemoveInstitutionalInfoHTMLCache,
  ISetInstitutionalInfoHTMLCache,
} from '@custom-types/services/cache/institutional-info-html-cache'
import { INSTITUTIONAL_INFO_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import {
  GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO,
  SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'

const INSTITUTIONAL_INFO_HTML_KEY = 'cache:institutionalInfo:aboutDescriptionHtml'

export async function getInstitutionalInfoHTMLCached({ redis }: IGetInstitutionalInfoHTMLCached) {
  const key = INSTITUTIONAL_INFO_HTML_KEY
  const htmlCached: string | null = await redis.get(key)

  if (!htmlCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, INSTITUTIONAL_INFO_HTML_CACHE_TTL)
  }

  logger.info({ key }, GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO)

  return htmlCached
}

export async function setInstitutionalInfoHTMLCache({ htmlContent, redis }: ISetInstitutionalInfoHTMLCache) {
  const key = INSTITUTIONAL_INFO_HTML_KEY
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', INSTITUTIONAL_INFO_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, INSTITUTIONAL_INFO_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO)

  return wasCached
}

export async function removeInstitutionalInfoHTMLCache({ redis }: IRemoveInstitutionalInfoHTMLCache) {
  const key = INSTITUTIONAL_INFO_HTML_KEY
  await redis.del(key)
}
