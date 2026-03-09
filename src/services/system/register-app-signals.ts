import type { FastifyInstance } from 'fastify'
import { END_SIGNALS } from '@constants/arrays'
import { registerSignals } from '@services/system/register-signals'

/**
 * Registra handlers para sinais de encerramento do processo (SIGINT, SIGTERM, etc.)
 * que encerram graciosamente a instância Fastify.
 *
 * @param app - Instância do Fastify a ser encerrada.
 */
export function registerAppSignals(app: FastifyInstance) {
  registerSignals(END_SIGNALS, () => {
    app.close().then(() => {
      process.exit(0)
    })
  })
}
