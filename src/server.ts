import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { START_SERVER_MESSAGE } from '@messages/loggings/system/server-loggings'
import { app } from './app'
import { env } from './env'

async function bootstrap() {
  try {
    const server = await app.listen({
      host: '0.0.0.0',
      port: env.APP_PORT,
    })

    logger.info(`${START_SERVER_MESSAGE} ${server}`)
  } catch (error) {
    logError({ error })
    process.exit(1)
  }
}

bootstrap()
