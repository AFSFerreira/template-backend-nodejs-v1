import type { Redis } from 'ioredis'
import { DIRECTOR_BOARD_HTML_CACHE_TTL } from '@constants/cache-constants'
import { AbstractHtmlCacheService } from '@lib/redis/helpers/abstract-html-cache-service'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import {
  GET_DIRECTOR_BOARD_HTML_CACHED_INFO,
  SET_DIRECTOR_BOARD_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DirectorBoardHtmlCacheService extends AbstractHtmlCacheService {
  constructor(
    @inject(tsyringeTokens.providers.redis)
    redis: Redis,
  ) {
    super(redis)
  }

  protected generateKey(publicId: string): string {
    return `cache:directorBoard:${publicId}:aboutMeHtml`
  }

  protected get ttlInMs(): number {
    return DIRECTOR_BOARD_HTML_CACHE_TTL
  }

  protected get logMessages() {
    return {
      get: GET_DIRECTOR_BOARD_HTML_CACHED_INFO,
      set: SET_DIRECTOR_BOARD_HTML_CACHE_INFO,
    }
  }
}
