import { resolve4, resolve6, resolveMx } from 'node:dns/promises'
import { ValidateMxRecordCacheService } from '@services/caches/validate-mx-record-cache'
import { isNodeSystemError } from '@utils/guards/is-node-system-error'
import { inject, injectable } from 'tsyringe'

@injectable()
export class MxRecordValidationService {
  constructor(
    @inject(ValidateMxRecordCacheService)
    private readonly mxRecordCacheService: ValidateMxRecordCacheService,
  ) {}

  async checkFallbackRecord(domain: string): Promise<boolean> {
    const [aRecordsResult, aaaaRecordsResult] = await Promise.allSettled([resolve4(domain), resolve6(domain)])

    const hasA = aRecordsResult.status === 'fulfilled' && aRecordsResult.value.length > 0

    const hasAAAA = aaaaRecordsResult.status === 'fulfilled' && aaaaRecordsResult.value.length > 0

    return hasA || hasAAAA
  }

  async validate(email: string) {
    const domain = email.split('@')[1]

    const mxRecordCached = await this.mxRecordCacheService.get(domain)

    if (mxRecordCached) return mxRecordCached === 'valid'

    try {
      const mxRecords = await resolveMx(domain)

      if (mxRecords && mxRecords.length > 0) {
        await this.mxRecordCacheService.set(domain, 'valid')

        return true
      }
    } catch (error: unknown) {
      if (isNodeSystemError(error)) {
        if (error.code === 'ENOTFOUND' || error.code === 'NXDOMAIN') {
          await this.mxRecordCacheService.set(domain, 'invalid')
          return false
        }

        if (error.code === 'ENODATA') {
          const domainRecordFbResult = (await this.checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

          await this.mxRecordCacheService.set(domain, domainRecordFbResult)
          return domainRecordFbResult === 'valid'
        }
      }

      // Timeout, SERVFAIL, etc
      return true
    }

    const domainRecordFbResult = (await this.checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

    await this.mxRecordCacheService.set(domain, domainRecordFbResult)

    return domainRecordFbResult === 'valid'
  }
}
