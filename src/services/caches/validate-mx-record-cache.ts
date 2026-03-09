import type {
  IGetMxRecordCached,
  ISetMxRecordCached,
  MxRecordResult,
} from '@custom-types/services/cache/validate-mx-record-cache'
import { MX_RECORD_VERIFY_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { GET_MX_RECORD_CACHED_INFO, SET_MX_RECORD_CACHE_INFO } from '@messages/loggings/services/cache'

const generateMxRecordKey = (mxRecord: string) => `mx-record:verify:${mxRecord}`

/**
 * Busca o resultado de validação de registro MX no cache Redis.
 *
 * Renova o TTL automaticamente quando encontra o resultado em cache.
 *
 * @param mxRecord - Domínio do registro MX.
 * @param redis - Instância do cliente Redis.
 * @returns `'valid'`, `'invalid'` ou `null` se não estiver em cache.
 */
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

/**
 * Armazena o resultado de validação de registro MX no cache Redis.
 *
 * Usa `NX` para evitar sobrescrita. Caso já exista, apenas renova o TTL.
 *
 * @param mxRecord - Domínio do registro MX.
 * @param result - Resultado da validação (`'valid'` ou `'invalid'`).
 * @param redis - Instância do cliente Redis.
 * @returns `'OK'` se cacheado pela primeira vez, ou `null` se já existia.
 */
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
