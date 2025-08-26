import { upload } from '@lib/multer'
import { authenticationMiddleware } from '@middlewares/authentication-middleware'
import { verifyPermissions } from '@middlewares/verify-user-role'
import { UserRoleType } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { checkAvailability } from './check-availability'
import { exportData } from './export-data'
import { findByPublicUserId } from './find-by-public-id'
import { forgotPassword } from './forgot-password'
import { getAllUsers } from './get-all-users'
import { getAllUsersSimplified } from './get-all-users-simplified'
import { getEducationLevels } from './get-education-levels'
import { getUserProfile } from './get-user-profile'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { resetPassword } from './reset-password'

export async function userRoutes(app: FastifyInstance) {
  // Admin Routes:
  app.get(
    '/all-users',
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
  
  app.get('/all-users-simplified', getAllUsersSimplified)

  // Register Routes:
  app.post(
    '/',
    {
      preHandler: [upload.single('profileImage')],
    },
    register,
  )
  app.get('/education-levels', getEducationLevels)

  // Availability check routes:
  app.get('/availability', checkAvailability)

  // Authentication Routes:
  app.post('/sessions', authenticate)
  app.post(
    '/sessions/refresh-token',
    {
      preHandler: [authenticationMiddleware],
    },
    refreshToken,
  )
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
