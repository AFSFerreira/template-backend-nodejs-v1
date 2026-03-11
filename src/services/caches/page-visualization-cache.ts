import { PAGE_VIEW_DEDUPLICATION_TTL } from '@constants/timing-constants'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { redisTokens } from '@lib/redis/helpers/redis-tokens'
import { HashService } from '@services/hashes/hash-service'
import dayjs from 'dayjs'
import ms from 'ms'
import { inject, injectable } from 'tsyringe'

const VIEW_DEDUPLICATION_TTL = PAGE_VIEW_DEDUPLICATION_TTL
const DATE_FORMAT = 'YYYY-MM-DD'

const generatePageViewKey = (date: string) => `views:daily:${date}`

@injectable()
export class PageVisualizationCacheService {
  constructor(
    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async registerPageView(ip: string) {
    const todayStr = dayjs().format(DATE_FORMAT)
    const hashedIp = this.hashService.hashToken(ip)

    const deduplicationKey = `view:dedup:user:${hashedIp}`
    const dailyCountKey = generatePageViewKey(todayStr)

    const isNewView = await redis.set(deduplicationKey, '1', 'PX', VIEW_DEDUPLICATION_TTL, 'NX')

    if (isNewView) {
      await redis.incr(dailyCountKey)
      await redis.expire(dailyCountKey, ms('30d') / 1000)

      const updatedChartData = await this.getPageViewsLast7Days()

      const pubSubPayload = JSON.stringify({
        event: 'METRICS_UPDATED',
        data: updatedChartData,
      })

      await redis.publish(redisTokens.pubSub.channels.dashboardMetrics, pubSubPayload)

      logger.info({ ip }, 'Nova visualização única registrada e publicada no canal')

      return true
    }

    return false
  }

  async getPageViewsLast7Days() {
    const dates = Array.from({ length: 7 })
      .map((_, i) => {
        return dayjs().subtract(i, 'day').format(DATE_FORMAT)
      })
      .reverse()

    const keys = dates.map((date) => generatePageViewKey(date))

    const rawCounts = await redis.mget(keys)

    const chartData = dates.map((date, index) => ({
      date,
      views: parseInt(rawCounts[index] || '0', 10),
    }))

    return chartData
  }
}
