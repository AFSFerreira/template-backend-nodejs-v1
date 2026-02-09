import { resolve4, resolveMx } from 'node:dns/promises'
import { redis } from '@lib/redis'
import { getMxRecordCached, setMxRecordCached } from '@services/cache/validate-mx-record-cache'
import { isNodeSystemError } from '@services/guards/is-node-system-error'

async function checkFallbackRecord(domain: string): Promise<boolean> {
  try {
    const aRecords = await resolve4(domain)
    if (aRecords.length > 0) {
      return true
    }
  } catch (error) {
    if (isNodeSystemError(error) && (error.code === 'ENOTFOUND' || error.code === 'ENODATA')) {
      return false
    }
  }
  return false
}

export async function hasValidMxRecord(email: string) {
  const domain = email.split('@')[1]

  const mxRecordCached = await getMxRecordCached({
    mxRecord: domain,
    redis,
  })

  if (mxRecordCached) return mxRecordCached === 'valid'

  try {
    const mxRecords = await resolveMx(domain)

    if (mxRecords && mxRecords.length > 0) {
      await setMxRecordCached({
        mxRecord: domain,
        result: 'valid',
        redis,
      })

      return true
    }
  } catch (error: unknown) {
    if (isNodeSystemError(error)) {
      if (error.code === 'ENOTFOUND' || error.code === 'NXDOMAIN') {
        await setMxRecordCached({
          mxRecord: domain,
          result: 'invalid',
          redis,
        })
        return false
      }

      if (error.code === 'ENODATA') {
        const domainRecordFbResult = (await checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

        await setMxRecordCached({
          mxRecord: domain,
          result: domainRecordFbResult,
          redis,
        })
        return domainRecordFbResult === 'valid'
      }
    }

    // Timeout, SERVFAIL, etc
    return true
  }

  const domainRecordFbResult = (await checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

  await setMxRecordCached({
    mxRecord: domain,
    result: domainRecordFbResult,
    redis,
  })

  return domainRecordFbResult === 'valid'
}
