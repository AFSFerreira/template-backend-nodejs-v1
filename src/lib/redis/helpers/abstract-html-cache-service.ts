import type { Redis } from 'ioredis'
import { logger } from '@lib/pino'

export abstract class AbstractHtmlCacheService {
  constructor(protected readonly redis: Redis) {}

  protected abstract generateKey(id: string): string
  protected abstract get ttlInMs(): number
  protected abstract get logMessages(): { get: string; set: string }

  /**
   * Busca o HTML no cache e renova o TTL automaticamente (sliding expiration).
   */
  public async get(id: string): Promise<string | null> {
    const key = this.generateKey(id)
    const htmlCached = await this.redis.get(key)

    if (htmlCached) {
      await this.redis.pexpire(key, this.ttlInMs)
    }

    logger.info({ key }, this.logMessages.get)

    return htmlCached
  }

  /**
   * Armazena o HTML com NX (evita sobrescrita).
   */
  public async set(id: string, htmlContent: string): Promise<'OK' | null> {
    const key = this.generateKey(id)
    const wasCached = await this.redis.set(key, htmlContent, 'PX', this.ttlInMs, 'NX')

    if (!wasCached) {
      await this.redis.pexpire(key, this.ttlInMs)
    }

    logger.info({ key, wasCached }, this.logMessages.set)

    return wasCached as 'OK' | null
  }

  /**
   * Remove o HTML do cache.
   */
  public async remove(id: string): Promise<void> {
    const key = this.generateKey(id)
    await this.redis.del(key)
  }
}
