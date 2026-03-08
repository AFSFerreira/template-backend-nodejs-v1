import type {
  IGetMxRecordCached,
  ISetMxRecordCached,
  MxRecordResult,
} from '@custom-types/services/cache/validate-mx-record-cache'
import { MX_RECORD_VERIFY_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { GET_MX_RECORD_CACHED_INFO, SET_MX_RECORD_CACHE_INFO } from '@messages/loggings/services/cache'

const generateMxRecordKey = (mxRecord: string) => `mx-record:verify:${mxRecord}`

export async function getMxRecordCached({ mxRecord, redis }: IGetMxRecordCached): Promise<MxRecordResult | null> {
  const key = generateMxRecordKey(mxRecord)
  const mxRecordCached: MxRecordResult | null = (await redis.get(key)) as MxRecordResult

  if (mxRecordCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, MX_RECORD_VERIFY_TTL)
  }

  logger.info({ key }, GET_MX_RECORD_CACHED_INFO)

  return mxRecordCached
}

export async function setMxRecordCached({ mxRecord, result, redis }: ISetMxRecordCached) {
  const key = generateMxRecordKey(mxRecord)
  const mxRecordWasCached: 'OK' | null = await redis.set(key, result, 'PX', MX_RECORD_VERIFY_TTL, 'NX')

  if (!mxRecordWasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, MX_RECORD_VERIFY_TTL)
  }

  logger.info({ key, mxRecordWasCached }, SET_MX_RECORD_CACHE_INFO)

  return mxRecordWasCached
}
