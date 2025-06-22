import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'
import { logout } from './logout'
import { register } from './register'
import { authentication } from '@/middlewares/authentication'
import { exportUserData } from './export-user-data'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users/export', exportUserData)

  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/sessions/refresh-token', refreshToken)

  app.delete('/sessions', { preHandler: [authentication] }, logout)
}
