import type {
  IGetDirectorBoardHTMLCached,
  IRemoveDirectorBoardHTMLCache,
  ISetDirectorBoardHTMLCache,
} from '@custom-types/services/cache/director-board-html-cache'
import { DIRECTOR_BOARD_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/logger'
import {
  GET_DIRECTOR_BOARD_HTML_CACHED_INFO,
  SET_DIRECTOR_BOARD_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'

const generateDirectorBoardHtmlKey = (directorBoardId: number) => `cache:directorBoard:${directorBoardId}:aboutMeHtml`

export async function getDirectorBoardHTMLCached({ directorBoardId, redis }: IGetDirectorBoardHTMLCached) {
  const key = generateDirectorBoardHtmlKey(directorBoardId)
  const htmlCached: string | null = await redis.get(key)

  if (!htmlCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
  }

  logger.info({ key }, GET_DIRECTOR_BOARD_HTML_CACHED_INFO)

  return htmlCached
}

export async function setDirectorBoardHTMLCache({ directorBoardId, htmlContent, redis }: ISetDirectorBoardHTMLCache) {
  const key = generateDirectorBoardHtmlKey(directorBoardId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', DIRECTOR_BOARD_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_DIRECTOR_BOARD_HTML_CACHE_INFO)

  return wasCached
}

export async function removeDirectorBoardHTMLCache({ directorBoardId, redis }: IRemoveDirectorBoardHTMLCache) {
  const key = generateDirectorBoardHtmlKey(directorBoardId)
  await redis.del(key)
}
