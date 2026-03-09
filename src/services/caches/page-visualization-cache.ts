import type { Redis } from 'ioredis'
import { PAGE_VIEW_DEDUPLICATION_TTL } from '@constants/timing-constants'
import { logger } from '@lib/pino'
import { redisTokens } from '@lib/redis/helpers/redis-tokens'
import { HashService } from '@services/hashes/hash-service'
import dayjs from 'dayjs'
import ms from 'ms'

interface IRegisterPageView {
  ip: string
  redis: Redis
}

const VIEW_DEDUPLICATION_TTL = PAGE_VIEW_DEDUPLICATION_TTL
const DATE_FORMAT = 'YYYY-MM-DD'

const generatePageViewKey = (date: string) => `views:daily:${date}`

/**
 * Registra uma visualização única por IP com deduplication via Redis NX.
 * Em caso de nova visualização, incrementa o contador diário e publica o
 * snapshot atualizado dos últimos 7 dias no canal Pub/Sub de métricas.
 *
 * @param ip - Endereço IP do visitante.
 * @param redis - Instância do cliente Redis.
 * @returns `true` se a visualização foi registrada, `false` se já havia sido computada.
 */
export async function registerPageView({ ip, redis }: IRegisterPageView) {
  const todayStr = dayjs().format(DATE_FORMAT)
  const hashedIp = HashService.hashToken(ip)

  const deduplicationKey = `view:dedup:user:${hashedIp}`
  const dailyCountKey = generatePageViewKey(todayStr)

  const isNewView = await redis.set(deduplicationKey, '1', 'PX', VIEW_DEDUPLICATION_TTL, 'NX')

  if (isNewView) {
    await redis.incr(dailyCountKey)
    await redis.expire(dailyCountKey, ms('30d') / 1000)

    const updatedChartData = await getPageViewsLast7Days(redis)

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

/**
 * Busca os contadores de visualizações dos últimos 7 dias via Redis MGET,
 * retornando um array em ordem cronológica com data e total de views por dia.
 *
 * @param redis - Instância do cliente Redis.
 * @returns Array com `{ date: string, views: number }` para cada um dos 7 dias.
 */
export async function getPageViewsLast7Days(redis: Redis) {
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
