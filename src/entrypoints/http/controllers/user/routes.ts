import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { authenticateBodySchema } from '@http/schemas/user/authenticate-body-schema'
import { checkAvailabilityQuerySchema } from '@http/schemas/user/check-availability-query-schema'
import { confirmEmailChangeBodySchema } from '@http/schemas/user/confirm-email-change-body-schema'
import { deleteUserByAdminParamsSchema } from '@http/schemas/user/delete-user-by-admin-params-schema'
import { findUserByPublicIdParamsSchema } from '@http/schemas/user/find-by-public-id-params-schema'
import { forgotPasswordBodySchema } from '@http/schemas/user/forgot-password-body-schema'
import { getAllUsersDetailedQuerySchema } from '@http/schemas/user/get-all-users-detailed-query-schema'
import { getAllUsersSimplifiedQuerySchema } from '@http/schemas/user/get-all-users-simplified-query-schema'
import { registerBodySchema } from '@http/schemas/user/register-body-schema'
import { requestEmailChangeBodySchema } from '@http/schemas/user/request-email-change-body-schema'
import { resetPasswordBodySchema } from '@http/schemas/user/reset-password-body-schema'
import { reviewMembershipStatusBodySchema } from '@http/schemas/user/review-membership-status-body-schema'
import { reviewMembershipStatusParamsSchema } from '@http/schemas/user/review-membership-status-params-schema'
import { transferAdminRoleBodySchema } from '@http/schemas/user/transfer-admin-role-body-schema'
import { updateMembershipStatusBodySchema } from '@http/schemas/user/update-membership-status-body-schema'
import { updateMembershipStatusParamsSchema } from '@http/schemas/user/update-membership-status-params-schema'
import { changePasswordBodySchema } from '@http/schemas/user/update-password-body-schema'
import { updateBodySchema } from '@http/schemas/user/update-user-body-schema'
import { updateUserPermissionsBodySchema } from '@http/schemas/user/update-user-permissions-body-schema'
import { updateUserPermissionsParamsSchema } from '@http/schemas/user/update-user-permissions-params-schema'
import { verifyEmailBodySchema } from '@http/schemas/user/verify-email-body-schema'
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

export async function userRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        querystring: getAllUsersDetailedQuerySchema,
      },
    },
    getAllUsersDetailed,
  )
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: getAllUsersSimplifiedQuerySchema,
      },
    },
    getAllUsersSimplified,
  )
  app.get(
    '/availability',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: checkAvailabilityQuerySchema,
      },
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
      schema: {
        params: findUserByPublicIdParamsSchema,
      },
    },
    findUserByPublicId,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      schema: {
        body: registerBodySchema,
      },
    },
    createUser,
  )
  app.post(
    '/sessions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        body: authenticateBodySchema,
      },
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
      schema: {
        body: forgotPasswordBodySchema,
      },
    },
    forgotPassword,
  )
  app.post(
    '/verify-email',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        body: verifyEmailBodySchema,
      },
    },
    verifyEmail,
  )

  // PATCH
  app.patch(
    '/reset-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        body: resetPasswordBodySchema,
      },
    },
    resetPassword,
  )
  app.patch(
    '/change-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
      schema: {
        body: changePasswordBodySchema,
      },
    },
    changePassword,
  )
  app.patch(
    '/request-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
      schema: {
        body: requestEmailChangeBodySchema,
      },
    },
    requestEmailChange,
  )
  app.patch(
    '/confirm-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        body: confirmEmailChangeBodySchema,
      },
    },
    confirmEmailChange,
  )
  app.patch(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
      schema: {
        body: updateBodySchema,
      },
    },
    updateUser,
  )
  app.patch(
    '/update/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
      schema: {
        body: updateBodySchema,
      },
    },
    updateUser,
  )
  app.patch(
    '/:publicId/review-membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: reviewMembershipStatusParamsSchema,
        body: reviewMembershipStatusBodySchema,
      },
    },
    reviewMembershipStatus,
  )
  app.patch(
    '/:publicId/membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        params: updateMembershipStatusParamsSchema,
        body: updateMembershipStatusBodySchema,
      },
    },
    updateMembershipStatus,
  )
  app.patch(
    '/:publicId/permissions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        params: updateUserPermissionsParamsSchema,
        body: updateUserPermissionsBodySchema,
      },
    },
    updateUserPermissions,
  )
  app.patch(
    '/transfer-admin',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        body: transferAdminRoleBodySchema,
      },
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
      schema: {
        params: deleteUserByAdminParamsSchema,
      },
    },
    deleteUserByAdmin,
  )
}
