import { MANAGER_PERMISSIONS } from '@constants/route-configuration-constants'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { checkAvailability } from './check-availability.controller'
import { deleteUserByAdmin } from './delete-user-by-admin.controller'
import { deleteUser } from './delete-user.controller'
import { exportUsersData } from './export-users-data.controller'
import { forgotPassword } from './forgot-password.controller'
import { getAllUsersDetailed } from './get-all-users-detailed.controller'
import { getAllUsersSimplified } from './get-all-users-simplified.controller'
import { getUserByPublicId } from './get-user-by-public-id.controller'
import { getUserProfile } from './get-user-profile.controller'
import { logout } from './logout.controller'
import { refreshToken } from './refresh-token.controller'
import { register } from './register.controller'
import { resetPassword } from './reset-password.controller'
import { reviewMembershipStatus } from './review-membership-status.controller'
import { updateUserByPublicId } from './update-user-by-public-id.controller'
import { updateUser } from './update-user.controller'
import { uploadRegisterProfileImage } from './upload-register-profile-image.controller'

export async function userRoutes(app: FastifyInstance) {
  // Admin Routes:
  app.get(
    '/all-users-detailed',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getAllUsersDetailed,
  )
  app.get(
    '/export',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    exportUsersData,
  )
  app.get(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getUserByPublicId,
  )
  app.patch(
    '/update/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    updateUserByPublicId,
  )
  app.patch(
    '/:publicId/review-membership-status',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    reviewMembershipStatus,
  )
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteUserByAdmin,
  )

  // User Routes:
  app.get(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    getUserProfile,
  )
  app.get('/all-users', getAllUsersSimplified)
  app.patch(
    '/update/me',
    {
      preHandler: [verifyJwt],
    },
    updateUser,
  )
  app.delete(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    deleteUser,
  )

  // Register Routes:
  app.post(
    '/',
    {
      ...rateLimit({ max: 100, timeWindow: '1d' }),
    },
    register,
  )
  app.post(
    '/uploads/profile-image',
    {
      preHandler: [verifyMultipart],
      ...rateLimit({ max: 500, timeWindow: '30s' }),
    },
    uploadRegisterProfileImage,
  )

  // Availability check routes:
  app.get('/availability', checkAvailability)

  // Authentication Routes:
  app.post('/sessions', authenticate)
  app.post(
    '/sessions/refresh-token',
    {
      preHandler: [verifyJwt],
    },
    refreshToken,
  )
  app.post(
    '/forgot-password',
    {
      ...rateLimit({ max: 100, timeWindow: '1h' }),
    },
    forgotPassword,
  )
  app.patch('/reset-password', resetPassword)
  app.patch(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    updateUser,
  )
  app.delete(
    '/sessions',
    {
      preHandler: [verifyJwt],
    },
    logout,
  )
}
