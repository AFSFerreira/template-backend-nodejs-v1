import type { MxRecordResult } from '@custom-types/services/cache/validate-mx-record-cache'
import type { Redis } from 'ioredis'
import { MX_RECORD_VERIFY_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { GET_MX_RECORD_CACHED_INFO, SET_MX_RECORD_CACHE_INFO } from '@messages/loggings/services/cache'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ValidateMxRecordCacheService {
  constructor(
    @inject(tsyringeTokens.providers.redis)
    private readonly redis: Redis,
  ) {}

  private generateKey(mxRecord: string): string {
    return `mx-record:verify:${mxRecord}`
  }

  async get(mxRecord: string): Promise<MxRecordResult | null> {
    const key = this.generateKey(mxRecord)
    const mxRecordCached = (await this.redis.get(key)) as MxRecordResult | null

    if (mxRecordCached) {
      await this.redis.pexpire(key, MX_RECORD_VERIFY_TTL)
    }

    logger.info({ key }, GET_MX_RECORD_CACHED_INFO)

    return mxRecordCached
  }

  async set(mxRecord: string, result: MxRecordResult): Promise<'OK' | null> {
    const key = this.generateKey(mxRecord)
    const mxRecordWasCached: 'OK' | null = await this.redis.set(key, result, 'PX', MX_RECORD_VERIFY_TTL, 'NX')

    if (!mxRecordWasCached) {
      await this.redis.pexpire(key, MX_RECORD_VERIFY_TTL)
    }

    logger.info({ key, mxRecordWasCached }, SET_MX_RECORD_CACHE_INFO)

    return mxRecordWasCached
  }
}
