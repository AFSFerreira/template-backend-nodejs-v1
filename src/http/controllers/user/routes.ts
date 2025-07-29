import { UserRole } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportUserData } from './export-user-data'
import { findByPublicUserId } from './find-by-public-id'
import { getAllUsers } from './get-all-users'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { resetUserPassword } from './reset-user-password'
import { authenticationMiddleware } from '@/http/middlewares/authenticate'
import { verifyPermissions } from '@/http/middlewares/verify-user-role'
import { upload } from '@/lib/multer'

export async function userRoutes(app: FastifyInstance) {
  // User Admin Routes:
  app.get(
    '/',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRole.ADMIN]),
      ],
    },
    getAllUsers,
  )
  app.get(
    '/:publicId',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRole.ADMIN]),
      ],
    },
    findByPublicUserId,
  )
  app.get(
    '/export',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRole.ADMIN]),
      ],
    },
    exportUserData,
  )

  // Register Routes:
  app.post(
    '/',
    {
      preHandler: [upload.single('profileImage')],
    },
    register,
  )

  // Authentication Routes:
  app.post('/sessions', authenticate)
  app.post('/sessions/refresh-token', refreshToken)
  app.patch(
    '/reset-password',
    { onRequest: [authenticationMiddleware] },
    resetUserPassword,
  )
  app.delete(
    '/sessions',
    {
      preHandler: [authenticationMiddleware],
    },
    logout,
  )
}
