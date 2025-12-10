import { END_SIGNALS } from '@constants/arrays'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { START_SERVER_MESSAGE } from '@messages/loggings/server-loggings'
import { registerSignals } from '@utils/system/regsiter-signals'
import { app } from './app'
import { env } from './env'

async function bootstrap() {
  try {
    const server = await app.listen({
      host: '0.0.0.0',
      port: env.APP_PORT,
    })

    logger.info(`${START_SERVER_MESSAGE} ${server}`)

    registerSignals(END_SIGNALS, () => {
      app.close().then(() => {
        process.exit(0)
      })
    })
  } catch (error) {
    logError({ error })
    process.exit(1)
  }
}

bootstrap()
