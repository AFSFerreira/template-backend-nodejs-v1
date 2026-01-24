import { resolveMx } from 'node:dns/promises'
import { redis } from '@lib/redis'
import { getMxRecordCached, setMxRecordCached } from '@services/cache/validate-mx-record-cache'

export async function hasValidMxRecord(email: string) {
  const domain = email.split('@')[1]

  if (!domain) return false

  const mxRecordCached = await getMxRecordCached({
    mxRecord: domain,
    redis,
  })

  if (mxRecordCached) return true

  try {
    const records = await resolveMx(domain)

    const isMxValid = records && records.length > 0

    if (isMxValid) {
      setMxRecordCached({
        mxRecord: domain,
        redis,
      })
    }

    return isMxValid
  } catch (_error) {
    return false
  }
}
