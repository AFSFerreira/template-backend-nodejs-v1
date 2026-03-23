import type { WebSocket } from '@fastify/websocket'
import type { UserRoleType } from '@prisma/generated/enums'
import type { FastifyRequest } from 'fastify'
import { logError } from '@lib/pino/helpers/log-error'
import { verifyTokenIsolated } from '@utils/http/verify-jwt-token'
import { collectZodErrors } from '@utils/validators/collect-zod-errors'
import { getSocketExp } from '@utils/ws/get-socket-exp'
import { getSocketUserId } from '@utils/ws/get-socket-user-public-id'
import { getSocketUserRole } from '@utils/ws/get-socket-user-role'
import { clientStates } from '@ws/client-states'
import { WsDispatcher } from '@ws/dispatcher'
import { wsMessageSchema } from '@ws/schemas/ws-message-schema'

export async function wsConnectionHandler(socket: WebSocket, _req: FastifyRequest) {
  let isAuthenticated = false
  let userRole: UserRoleType | null = null
  let userId: string | null = null

  const dispatcher = WsDispatcher.getInstance()

  socket.on('message', async (message: Buffer) => {
    try {
      const rawData = JSON.parse(message.toString())

      const validation = wsMessageSchema.safeParse(rawData)

      if (!validation.success) {
        socket.send(
          JSON.stringify({
            error: 'Invalid payload contract',
            details: collectZodErrors(validation.error),
          }),
        )

        return
      }

      const { action, payload, token } = validation.data

      if (action === 'authenticate' && token) {
        try {
          const decoded = verifyTokenIsolated(token)

          userId = getSocketUserId(decoded)

          userRole = getSocketUserRole(decoded)

          const tokenExp = getSocketExp(decoded)

          const currentState = clientStates.get(socket) || { isAlive: true, subscriptions: new Set<string>() }

          clientStates.set(socket, { ...currentState, tokenExp })

          isAuthenticated = true

          socket.send(JSON.stringify({ event: 'authenticated', status: 'success' }))

          return
        } catch (error) {
          logError({ error, message: 'Invalid token' })

          socket.send(JSON.stringify({ error: 'Invalid token' }))

          return
        }
      }

      const routeConfig = dispatcher.getRoute(action)

      if (!routeConfig) {
        socket.send(JSON.stringify({ error: `Action '${action}' not recognized.` }))
        return
      }

      if (routeConfig.auth) {
        if (!isAuthenticated || !userRole) {
          socket.send(
            JSON.stringify({
              error: 'Unauthorized',
              message: `Action '${action}' requires authentication. Please send an 'authenticate' action with 'token' first.`,
            }),
          )
          return
        }

        if (routeConfig.auth.role) {
          if (!routeConfig.auth.role.includes(userRole)) {
            socket.send(
              JSON.stringify({
                error: 'Forbidden',
                message: `Action '${action}' requires more privileges.`,
              }),
            )
            return
          }
        }
      }

      await routeConfig.controller(socket, userId, payload)
    } catch (error) {
      logError({ error, message: 'Invalid message format' })

      socket.send(JSON.stringify({ error: 'Invalid message format' }))
    }
  })
}
