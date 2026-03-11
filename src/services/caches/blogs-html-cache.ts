import type { Redis } from 'ioredis'
import { BLOG_HTML_CACHE_TTL } from '@constants/cache-constants'
import { AbstractHtmlCacheService } from '@lib/redis/helpers/abstract-html-cache-service'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GET_BLOG_HTML_CACHED_INFO, SET_BLOG_CACHE_INFO } from '@messages/loggings/services/cache'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogHtmlCacheService extends AbstractHtmlCacheService {
  constructor(
    @inject(tsyringeTokens.providers.redis)
    redis: Redis,
  ) {
    super(redis)
  }

  protected generateKey(publicId: string): string {
    return `cache:blog:${publicId}:contentHtml`
  }

  protected get ttlInMs(): number {
    return BLOG_HTML_CACHE_TTL
  }

  protected get logMessages() {
    return {
      get: GET_BLOG_HTML_CACHED_INFO,
      set: SET_BLOG_CACHE_INFO,
    }
  }
}
