import { logger } from '@lib/pino'
import { logError } from '@lib/pino/helpers/log-error'
import { IPC_READY_SIGNAL_SENT, START_SERVER_MESSAGE } from '@messages/loggings/system/server-loggings'
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

    // Avisa ao cluster do PM2 que pode liberar o tráfego HTTP
    // (A variável process.env.pm_id só existe se a aplicação estiver rodando via PM2)
    if (typeof process.send === 'function' && process.env.pm_id) {
      process.send('ready')
      logger.info(IPC_READY_SIGNAL_SENT)
    }
  } catch (error) {
    logError({ error })
    process.exit(1)
  }
}

await bootstrap()
