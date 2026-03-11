import { DIRECTOR_BOARD_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import {
  GET_DIRECTOR_BOARD_HTML_CACHED_INFO,
  SET_DIRECTOR_BOARD_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'
import { injectable } from 'tsyringe'

const generateDirectorBoardHtmlKey = (publicId: string) => `cache:directorBoard:${publicId}:aboutMeHtml`

@injectable()
export class DirectorBoardHtmlCacheService {
  async get(publicId: string) {
    const key = generateDirectorBoardHtmlKey(publicId)
    const htmlCached: string | null = await redis.get(key)

    if (htmlCached) {
      await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
    }

    logger.info({ key }, GET_DIRECTOR_BOARD_HTML_CACHED_INFO)

    return htmlCached
  }

  async set(publicId: string, htmlContent: string) {
    const key = generateDirectorBoardHtmlKey(publicId)
    const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', DIRECTOR_BOARD_HTML_CACHE_TTL, 'NX')

    if (!wasCached) {
      await redis.pexpire(key, DIRECTOR_BOARD_HTML_CACHE_TTL)
    }

    logger.info({ key, wasCached }, SET_DIRECTOR_BOARD_HTML_CACHE_INFO)

    return wasCached
  }

  async remove(publicId: string) {
    const key = generateDirectorBoardHtmlKey(publicId)
    await redis.del(key)
  }
}
