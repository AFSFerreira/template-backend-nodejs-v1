import type { FastifyInstance } from 'fastify'
import type { WebSocket } from 'ws'
import { logError } from '@lib/pino/helpers/log-error'
import ms from 'ms'
import { clientStates } from './client-states'
import { wsConnectionHandler } from './middlewares/ws-connection-handler'

export async function websocketRoutes(app: FastifyInstance) {
  // registerHandlers(WsDispatcher.getInstance())

  app.get('/ws', { websocket: true }, wsConnectionHandler)

  // ===== Configuração do Heartbeat para todas as Rotas =====

  const wss = app.websocketServer

  wss.on('connection', (ws: WebSocket) => {
    clientStates.set(ws, { isAlive: true, subscriptions: new Set<string>() })

    ws.on('pong', () => {
      const currentState = clientStates.get(ws) || { isAlive: false, subscriptions: new Set<string>() }
      clientStates.set(ws, { ...currentState, isAlive: true })
    })

    ws.on('error', (error) => {
      logError({ error, message: 'Erro na conexão WebSocket' })
    })
  })

  const interval = setInterval(() => {
    const nowInSeconds = Math.floor(Date.now() / 1000)

    wss.clients.forEach((ws: WebSocket) => {
      const state = clientStates.get(ws)

      if (!state || state.isAlive === false) {
        ws.terminate()
        return
      }

      const tokenExp = state.tokenExp

      if (tokenExp && nowInSeconds > tokenExp) {
        ws.send(JSON.stringify({ error: 'Session expired', code: 4001 }))
        ws.close(4001, 'Token Expired')
        return
      }

      clientStates.set(ws, { ...state, isAlive: false })

      ws.ping()
    })
  }, ms('30s'))

  app.addHook('onClose', (_app, done) => {
    clearInterval(interval)

    wss.clients.forEach((client) => {
      client.close()
    })

    done()
  })
}
