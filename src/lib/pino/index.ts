import type { LoggerOptions, StreamEntry } from 'pino'
import { IS_DEV } from '@constants/env-constants'
import { env } from '@env/index'
import { multistream, pino, stdSerializers, stdTimeFunctions } from 'pino'
import { getRequestIdStored } from '../async-local-storage/helpers/get-request-id-stored'
import { getUserIdStored } from '../async-local-storage/helpers/get-user-id-stored'

const baseConfig: LoggerOptions = {
  level: env.LOG_LEVEL ?? 'info',
  timestamp: stdTimeFunctions.isoTime,
  serializers: {
    req: stdSerializers.req,
    res: stdSerializers.res,
    err: stdSerializers.err,
  },
  formatters: {
    level(label) {
      return { level: label }
    },
  },
  mixin() {
    return { requestId: getRequestIdStored(), userId: getUserIdStored() }
  },
}

const prodStreams: StreamEntry[] = [
  { level: 'info', stream: process.stdout },
  { level: 'error', stream: process.stderr },
]

export const loggerConfig: LoggerOptions = IS_DEV
  ? {
      ...baseConfig,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      },
    }
  : baseConfig

export const logger = pino(loggerConfig, IS_DEV ? undefined : multistream(prodStreams, { dedupe: true }))
