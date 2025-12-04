import Redis from 'ioredis'
import { redisConnection } from './helpers/configuration'

export const redis = new Redis(redisConnection)
