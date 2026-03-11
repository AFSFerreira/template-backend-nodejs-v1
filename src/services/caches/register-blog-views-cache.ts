import type { Redis } from 'ioredis'
import { BLOG_IP_VIEW_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BLOG_VISUALIZATION_CACHED } from '@messages/loggings/services/cache'
import { HashService } from '@services/hashes/hash-service'
import { inject, singleton } from 'tsyringe'

@singleton()
export class RegisterBlogViewsCacheService {
  constructor(
    @inject(tsyringeTokens.providers.redis)
    private readonly redis: Redis,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async register(blogId: number, ip: string): Promise<'OK' | null> {
    const hashedIp = this.hashService.hashToken(ip)
    const key = `view:blog:${blogId}:userIp:${hashedIp}`
    const blogWasNotRecentlyViewed: 'OK' | null = await this.redis.set(key, '1', 'PX', BLOG_IP_VIEW_TTL, 'NX')

    logger.info({ blogId, blogWasNotRecentlyViewed }, BLOG_VISUALIZATION_CACHED)

    return blogWasNotRecentlyViewed
  }
}
