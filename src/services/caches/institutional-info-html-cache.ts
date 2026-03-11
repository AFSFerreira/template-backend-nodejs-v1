import type { Redis } from 'ioredis'
import { INSTITUTIONAL_INFO_HTML_CACHE_TTL } from '@constants/cache-constants'
import { AbstractHtmlCacheService } from '@lib/redis/helpers/abstract-html-cache-service'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import {
  GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO,
  SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO,
} from '@messages/loggings/services/cache'
import { inject, singleton } from 'tsyringe'

@singleton()
export class InstitutionalInfoHtmlCacheService extends AbstractHtmlCacheService {
  constructor(
    @inject(tsyringeTokens.providers.redis)
    redis: Redis,
  ) {
    super(redis)
  }

  protected generateKey(_publicId: string): string {
    return 'cache:institutionalInfo:aboutDescriptionHtml'
  }

  protected get ttlInMs(): number {
    return INSTITUTIONAL_INFO_HTML_CACHE_TTL
  }

  protected get logMessages() {
    return {
      get: GET_INSTITUTIONAL_INFO_HTML_CACHED_INFO,
      set: SET_INSTITUTIONAL_INFO_HTML_CACHE_INFO,
    }
  }

  public override async get(): Promise<string | null> {
    return super.get('')
  }

  public override async set(htmlContent: string): Promise<'OK' | null> {
    return super.set('', htmlContent)
  }

  public override async remove(): Promise<void> {
    return super.remove('')
  }
}
