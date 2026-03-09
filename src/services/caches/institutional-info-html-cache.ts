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

/**
 * Busca o HTML da descrição institucional ("Sobre") no cache Redis.
 *
 * Renova o TTL automaticamente quando o conteúdo não é encontrado.
 *
 * @param redis - Instância do cliente Redis.
 * @returns HTML cacheado ou `null` se não existir.
 */
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

/**
 * Armazena o HTML da descrição institucional no cache Redis.
 *
 * Usa `NX` para evitar sobrescrita. Caso já exista, apenas renova o TTL.
 *
 * @param htmlContent - Conteúdo HTML a ser cacheado.
 * @param redis - Instância do cliente Redis.
 * @returns `'OK'` se cacheado pela primeira vez, ou `null` se já existia.
 */
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

/**
 * Remove o HTML da descrição institucional do cache Redis.
 *
 * @param redis - Instância do cliente Redis.
 */
export async function removeInstitutionalInfoHTMLCache({ redis }: IRemoveInstitutionalInfoHTMLCache) {
  const key = INSTITUTIONAL_INFO_HTML_KEY
  await redis.del(key)
}
