import { upload } from '@lib/multer'
import { authenticationMiddleware } from '@middlewares/authentication-middleware'
import { verifyPermissions } from '@middlewares/verify-user-role'
import { UserRoleType } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { checkEmailAvailability } from './check-email-availability'
import { checkUsernameAvailability } from './check-username-availability'
import { exportData } from './export-data'
import { findByPublicUserId } from './find-by-public-id'
import { forgotPassword } from './forgot-password'
import { getAllUsers } from './get-all-users'
import { getUserProfile } from './get-user-profile'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { resetPassword } from './reset-password'

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

  // User Routes:
  app.get(
    '/me',
    {
      preHandler: [authenticationMiddleware],
    },
    getUserProfile,
  )

  // Register Routes:
  app.post(
    '/',
    {
      preHandler: [upload.single('profileImage')],
    },
    register,
  )

  // Availability check routes
  app.get('/email/availability/:email', checkEmailAvailability)
  app.get('/username/availability/:username', checkUsernameAvailability)

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
