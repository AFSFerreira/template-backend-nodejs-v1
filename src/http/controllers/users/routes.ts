import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'
import { logout } from './logout'
import { register } from './register'
import { authentication } from '@/middlewares/authentication'
import { exportUserData } from './export-user-data'
import { USER_ROLE } from '@prisma/client'
import { verifyPermissions } from '@/middlewares/verifyPermissions'

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/users/export',
    { preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])] },
    exportUserData,
  )

  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/sessions/refresh-token', refreshToken)

  app.delete('/sessions', { preHandler: [authentication] }, logout)
}
