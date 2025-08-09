import { UserRoleType } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportData } from './export-data'
import { findByPublicUserId } from './find-by-public-id'
import { forgotPassword } from './forgot-password'
import { getAllUsers } from './get-all-users'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { resetPassword } from './reset-password'
import { authenticationMiddleware } from '@/http/middlewares/authentication-middleware'
import { upload } from '@/lib/multer'
import { verifyPermissions } from '@/middlewares/verify-user-role'

export async function userRoutes(app: FastifyInstance) {
  // User Admin Routes:
  app.get(
    '/',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRoleType.ADMIN, UserRoleType.MANAGER]),
      ],
    },
    getAllUsers,
  )
  app.get(
    '/:publicId',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRoleType.ADMIN, UserRoleType.MANAGER]),
      ],
    },
    findByPublicUserId,
  )
  app.get(
    '/export',
    {
      preHandler: [
        authenticationMiddleware,
        verifyPermissions([UserRoleType.ADMIN, UserRoleType.MANAGER]),
      ],
    },
    exportData,
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
  app.post('/forgot-password', forgotPassword)
  app.patch('/reset-password', resetPassword)
  app.delete(
    '/sessions',
    {
      preHandler: [authenticationMiddleware],
    },
    logout,
  )
}
