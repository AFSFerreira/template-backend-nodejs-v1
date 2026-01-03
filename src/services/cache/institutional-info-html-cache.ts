import type {
  IGetInstitutionalInfoHTMLCached,
  IRemoveInstitutionalInfoHTMLCache,
  ISetInstitutionalInfoHTMLCache,
} from '@custom-types/services/institutional-info-html-cache'
import { INSTITUTIONAL_INFO_HTML_CACHE_TTL } from '@constants/timing-constants'
import { logger } from '@lib/logger'
import {
  GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO,
  SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO,
} from '@messages/loggings/institutional-info-loggings'

const generateInstitutionalInfoHtmlKey = (institutionalInfoId: number) =>
  `cache:institutionalInfo:${institutionalInfoId}:aboutDescriptionHtml`

export async function getInstitutionalInfoHTMLCached({ institutionalInfoId, redis }: IGetInstitutionalInfoHTMLCached) {
  const key = generateInstitutionalInfoHtmlKey(institutionalInfoId)
  const htmlCached: string | null = await redis.get(key)

  logger.info({ key }, GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO)

  return htmlCached
}

export async function setInstitutionalInfoHTMLCache({
  institutionalInfoId,
  htmlContent,
  redis,
}: ISetInstitutionalInfoHTMLCache) {
  const key = generateInstitutionalInfoHtmlKey(institutionalInfoId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', INSTITUTIONAL_INFO_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, INSTITUTIONAL_INFO_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO)

  return wasCached
}

export async function removeInstitutionalInfoHTMLCache({
  institutionalInfoId,
  redis,
}: IRemoveInstitutionalInfoHTMLCache) {
  const key = generateInstitutionalInfoHtmlKey(institutionalInfoId)
  await redis.del(key)
}
