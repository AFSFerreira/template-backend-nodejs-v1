import type { FastifyInstance } from 'fastify'
import { END_SIGNALS } from '@constants/arrays'
import { registerSignals } from '@utils/system/regsiter-signals'

export function registerAppSignals(app: FastifyInstance) {
  registerSignals(END_SIGNALS, () => {
    app.close().then(() => {
      process.exit(0)
    })
  })
}
