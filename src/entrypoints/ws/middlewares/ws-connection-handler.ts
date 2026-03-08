import type { WebSocket } from '@fastify/websocket'
import type { FastifyRequest } from 'fastify'
import { logError } from '@lib/pino/helpers/log-error'
import { verifyTokenIsolated } from '@utils/http/verify-jwt-token'
import { getSocketUserPublicId } from '@utils/ws/get-socket-user-public-id'
import { wsDispatcher } from '@ws/dispatcher'
import { wsMessageSchema } from '@ws/schemas/ws-message-schema'

export async function wsConnectionHandler(socket: WebSocket, _req: FastifyRequest) {
  let isAuthenticated = false
  let userId: string | null = null

  socket.on('message', async (message: Buffer) => {
    try {
      const rawData = JSON.parse(message.toString())

      const validation = wsMessageSchema.safeParse(rawData)

      if (!validation.success) {
        socket.send(
          JSON.stringify({
            error: 'Invalid payload contract',
            details: validation.error.format(), // TODO: Usar o utilitário de capturas de erros do zod aqui
          }),
        )

        return
      }

      const { action, payload, token } = validation.data

      if (action === 'authenticate' && token) {
        try {
          const decoded = verifyTokenIsolated(token)

          userId = getSocketUserPublicId(decoded)

          isAuthenticated = true

          socket.send(JSON.stringify({ event: 'authenticated', status: 'success' }))

          return
        } catch (error) {
          logError({ error, message: 'Invalid token' })

          socket.send(JSON.stringify({ error: 'Invalid token' }))

          return
        }
      }

      const routeConfig = wsDispatcher.getRoute(action)

      if (!routeConfig) {
        socket.send(JSON.stringify({ error: `Action '${action}' not recognized.` }))
        return
      }

      if (routeConfig.requiresAuth && !isAuthenticated) {
        socket.send(
          JSON.stringify({
            error: 'Unauthorized',
            message: `Action '${action}' requires authentication. Please send an 'authenticate' action with 'token' first.`,
          }),
        )

        return
      }

      await routeConfig.controller(socket, userId, payload)
    } catch (error) {
      logError({ error, message: 'Invalid message format' })

      socket.send(JSON.stringify({ error: 'Invalid message format' }))
    }
  })
}
