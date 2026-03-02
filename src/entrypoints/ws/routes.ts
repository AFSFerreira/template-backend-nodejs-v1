import type { FastifyInstance } from 'fastify'
import type { WebSocket } from 'ws'
import ms from 'ms'
// import { WsDispatcher } from './dispatcher'
import { wsConnectionHandler } from './middlewares/ws-connection-handler'

// // Registrando rotas:
// WsDispatcher.register('SUBSCRIBE_METRICS', false, async (socket: WebSocket,
//   userId: string | null,
//   payload: unknown
// ) => {
//   console.log("deu certo")
//   socket.send(JSON.stringify({ data: "deu certo" }))
// })

const clientStates = new WeakMap<WebSocket, boolean>()

export async function websocketRoutes(app: FastifyInstance) {
  app.get('/ws', { websocket: true }, wsConnectionHandler)

  // ===== Configuração do Heartbeat para todas as Rotas =====

  const wss = app.websocketServer

  wss.on('connection', (ws: WebSocket) => {
    clientStates.set(ws, true)

    ws.on('pong', () => {
      clientStates.set(ws, true)
    })
  })

  const interval = setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
      if (clientStates.get(ws) === false) {
        ws.terminate()
      }

      clientStates.set(ws, false)

      ws.ping()
    })
  }, ms('30s'))

  app.addHook('onClose', (_app, done) => {
    clearInterval(interval)
    done()
  })
}
