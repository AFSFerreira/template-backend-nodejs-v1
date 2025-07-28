import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportUserData } from './export-user-data'
import { findByPublicUserId } from './find-by-public-id'
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
      preHandler: [authentication, verifyPermissions([UserRole.ADMIN])],
    },
    getAllUsers,
  )

  app.get(
    '/users/:publicId',
    {
      preHandler: [authentication, verifyPermissions([UserRole.ADMIN])],
    },
    findByPublicUserId,
  )

  app.get(
    '/users/export',
    {
      preHandler: [authentication, verifyPermissions([UserRole.ADMIN])],
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
