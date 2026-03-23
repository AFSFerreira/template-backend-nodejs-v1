import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { START_SERVER_MESSAGE } from '@messages/loggings/system/server-loggings'
import { buildApp } from './app'
import { env } from './env'

async function bootstrap() {
  try {
    const app = await buildApp()

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

await bootstrap()
