import type { FastifyInstance } from 'fastify'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { authenticate } from './authenticate.controller'
import { checkAvailability } from './check-availability.controller'
import { deleteUser } from './delete-user.controller'
import { deleteUserByAdmin } from './delete-user-by-admin.controller'
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
import { transferAdminRole } from './transfer-admin-role.controller'
import { updateProfileImage } from './update-profile-image.controller'
import { updateUser } from './update-user.controller'
import { updateUserByPublicId } from './update-user-by-public-id.controller'
import { updateUserPermissions } from './update-user-permissions.controller'
import { uploadRegisterProfileImage } from './upload-register-profile-image.controller'

export async function userRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/detailed',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getAllUsersDetailed,
  )
  app.get('/', getAllUsersSimplified)
  app.get('/availability', checkAvailability)
  app.get(
    '/export',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    exportUsersData,
  )
  app.get(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    getUserProfile,
  )
  app.get(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getUserByPublicId,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit({ max: 50, timeWindow: '1h' }),
    },
    register,
  )
  app.post(
    '/sessions',
    {
      ...rateLimit({ max: 300, timeWindow: '1m' }),
    },
    authenticate,
  )
  app.post(
    '/sessions/refresh-token',
    {
      preHandler: [verifyJwt],
    },
    refreshToken,
  )
  app.post(
    '/uploads/temp-profile-image',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyMultipart],
    },
    uploadRegisterProfileImage,
  )
  app.post(
    '/forgot-password',
    {
      ...rateLimit({ max: 100, timeWindow: '1h' }),
    },
    forgotPassword,
  )

  // PATCH
  app.patch('/reset-password', resetPassword)
  app.patch(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    updateUser,
  )
  app.patch(
    '/update/me',
    {
      preHandler: [verifyJwt],
    },
    updateUser,
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
  app.patch(
    '/:publicId/permissions',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateUserPermissions,
  )
  app.patch(
    '/transfer-admin',
    {
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    transferAdminRole,
  )
  app.patch(
    '/me/profile-image',
    {
      ...rateLimit({ max: 10, timeWindow: '1h' }),
      preHandler: [verifyJwt, verifyMultipart],
    },
    updateProfileImage,
  )

  // DELETE
  app.delete(
    '/sessions',
    {
      preHandler: [verifyJwt],
    },
    logout,
  )
  app.delete(
    '/me',
    {
      preHandler: [verifyJwt],
    },
    deleteUser,
  )
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteUserByAdmin,
  )
}
