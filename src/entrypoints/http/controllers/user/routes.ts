import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { authenticate } from './authenticate.controller'
import { changePassword } from './change-password.controller'
import { checkAvailability } from './check-availability.controller'
import { confirmEmailChange } from './confirm-email-change.controller'
import { createUser } from './create-user.controller'
import { deleteUser } from './delete-user.controller'
import { deleteUserByAdmin } from './delete-user-by-admin.controller'
import { exportUsersData } from './export-users-data.controller'
import { findUserByPublicId } from './find-user-by-public-id.controller'
import { forgotPassword } from './forgot-password.controller'
import { getAllUsersDetailed } from './get-all-users-detailed.controller'
import { getAllUsersSimplified } from './get-all-users-simplified.controller'
import { getUserProfile } from './get-user-profile.controller'
import { logout } from './logout.controller'
import { refreshToken } from './refresh-token.controller'
import { requestEmailChange } from './request-email-change.controller'
import { resetPassword } from './reset-password.controller'
import { reviewMembershipStatus } from './review-membership-status.controller'
import { transferAdminRole } from './transfer-admin-role.controller'
import { updateMembershipStatus } from './update-membership-status.controller'
import { updateUser } from './update-user.controller'
import { updateUserPermissions } from './update-user-permissions.controller'
import { uploadProfileImage } from './upload-profile-image.controller'
import { verifyEmail } from './verify-email.controller'

export async function userRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getAllUsersDetailed,
  )
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllUsersSimplified,
  )
  app.get(
    '/availability',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    checkAvailability,
  )
  app.get(
    '/export',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    exportUsersData,
  )
  app.get(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    getUserProfile,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    findUserByPublicId,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
    },
    createUser,
  )
  app.post(
    '/sessions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
    },
    authenticate,
  )
  app.post(
    '/sessions/refresh-token',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
    },
    refreshToken,
  )
  app.post(
    '/uploads/profile-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyMultipart],
    },
    uploadProfileImage,
  )
  app.post(
    '/forgot-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
    },
    forgotPassword,
  )
  app.post(
    '/verify-email',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
    },
    verifyEmail,
  )

  // PATCH
  app.patch(
    '/reset-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
    },
    resetPassword,
  )
  app.patch(
    '/change-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
    },
    changePassword,
  )
  app.patch(
    '/request-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
    },
    requestEmailChange,
  )
  app.patch(
    '/confirm-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
    },
    confirmEmailChange,
  )
  app.patch(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
    },
    updateUser,
  )
  app.patch(
    '/update/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
    },
    updateUser,
  )
  app.patch(
    '/:publicId/review-membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    reviewMembershipStatus,
  )
  app.patch(
    '/:publicId/membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateMembershipStatus,
  )
  app.patch(
    '/:publicId/permissions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    updateUserPermissions,
  )
  app.patch(
    '/transfer-admin',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    transferAdminRole,
  )

  // DELETE
  app.delete(
    '/sessions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    logout,
  )
  app.delete(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
    },
    deleteUser,
  )
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
    },
    deleteUserByAdmin,
  )
}
