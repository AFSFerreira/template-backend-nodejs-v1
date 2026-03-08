import type {
  IGetDirectorBoardHTMLCached,
  IRemoveDirectorBoardHTMLCache,
  ISetDirectorBoardHTMLCache,
} from '@custom-types/services/cache/director-board-html-cache'
import { DIRECTOR_BOARD_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import {
  GET_DIRECTOR_BOARD_HTML_CACHED_INFO,
  SET_DIRECTOR_BOARD_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'

const generateDirectorBoardHtmlKey = (publicId: string) => `cache:directorBoard:${publicId}:aboutMeHtml`

export async function getDirectorBoardHTMLCached({ publicId, redis }: IGetDirectorBoardHTMLCached) {
  const key = generateDirectorBoardHtmlKey(publicId)
  const htmlCached: string | null = await redis.get(key)

  if (!htmlCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
  }

  logger.info({ key }, GET_DIRECTOR_BOARD_HTML_CACHED_INFO)

  return htmlCached
}

export async function setDirectorBoardHTMLCache({ publicId, htmlContent, redis }: ISetDirectorBoardHTMLCache) {
  const key = generateDirectorBoardHtmlKey(publicId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', DIRECTOR_BOARD_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_DIRECTOR_BOARD_HTML_CACHE_INFO)

  return wasCached
}

export async function removeDirectorBoardHTMLCache({ publicId, redis }: IRemoveDirectorBoardHTMLCache) {
  const key = generateDirectorBoardHtmlKey(publicId)
  await redis.del(key)
}
