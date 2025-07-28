import { USER_ROLE } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportUserData } from './export-user-data'
import { findById } from './find-by-id'
import { getAllUsers } from './get-all-users'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { authentication } from '@/http/middlewares/verify-jwt'
import { verifyPermissions } from '@/http/middlewares/verify-user-role'
import { upload } from '@/lib/multer'

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/users',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
    },
    getAllUsers,
  )

  app.get(
    '/users/:userId',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
    },
    findById,
  )

  app.get(
    '/users/export',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
    },
    exportUserData,
  )

  app.post(
    '/users',
    {
      preHandler: [upload.single('profileImage')],
    },
    register,
  )

  app.post('/sessions', authenticate)

  app.post('/sessions/refresh-token', refreshToken)

  app.delete(
    '/sessions',
    {
      preHandler: [authentication],
    },
    logout,
  )
}
