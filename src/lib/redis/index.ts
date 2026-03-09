import { logError } from '@lib/pino/helpers/log-error'
import Redis from 'ioredis'
import { redisConnection } from './helpers/configuration'

export const redis = new Redis(redisConnection)

export const redisSubscriber = new Redis({
  ...redisConnection,
  maxRetriesPerRequest: null,
})

redisSubscriber.on('error', (error) => {
  logError({ error, message: '[Redis Subscriber] Erro na conexão de escuta:' })
})
