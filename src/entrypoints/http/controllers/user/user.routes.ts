import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS, MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { authenticateBodySchema } from '@http/schemas/user/authenticate-body-schema'
import { checkAvailabilityQuerySchema } from '@http/schemas/user/check-availability-query-schema'
import { confirmEmailChangeBodySchema } from '@http/schemas/user/confirm-email-change-body-schema'
import { deleteUserByAdminParamsSchema } from '@http/schemas/user/delete-user-by-admin-params-schema'
import { exportUsersDataQuerySchema } from '@http/schemas/user/export-users-data-query-schema'
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
import { userSwaggerDocs } from '@lib/swagger/models/user'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { AuthenticateController } from './authenticate.controller'
import { ChangePasswordController } from './change-password.controller'
import { CheckAvailabilityController } from './check-availability.controller'
import { ConfirmEmailChangeController } from './confirm-email-change.controller'
import { CreateUserController } from './create-user.controller'
import { DeleteUserController } from './delete-user.controller'
import { DeleteUserByAdminController } from './delete-user-by-admin.controller'
import { ExportUsersDataController } from './export-users-data.controller'
import { FindUserByPublicIdController } from './find-user-by-public-id.controller'
import { ForgotPasswordController } from './forgot-password.controller'
import { GetAllUsersDetailedController } from './get-all-users-detailed.controller'
import { GetAllUsersSimplifiedController } from './get-all-users-simplified.controller'
import { GetUserProfileController } from './get-user-profile.controller'
import { LogoutController } from './logout.controller'
import { RefreshTokenController } from './refresh-token.controller'
import { RequestEmailChangeController } from './request-email-change.controller'
import { ResetPasswordController } from './reset-password.controller'
import { ReviewMembershipStatusController } from './review-membership-status.controller'
import { TransferAdminRoleController } from './transfer-admin-role.controller'
import { UpdateMembershipStatusController } from './update-membership-status.controller'
import { UpdateUserController } from './update-user.controller'
import { UpdateUserPermissionsController } from './update-user-permissions.controller'
import { UploadProfileImageController } from './upload-profile-image.controller'
import { VerifyEmailController } from './verify-email.controller'

export async function userRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/restrict',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.getAllUsersDetailed,
        querystring: getAllUsersDetailedQuerySchema,
      },
    },
    adaptRoute(GetAllUsersDetailedController),
  )
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...userSwaggerDocs.getAllUsersSimplified,
        querystring: getAllUsersSimplifiedQuerySchema,
      },
    },
    adaptRoute(GetAllUsersSimplifiedController),
  )
  app.get(
    '/availability',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...userSwaggerDocs.checkAvailability,
        querystring: checkAvailabilityQuerySchema,
      },
    },
    adaptRoute(CheckAvailabilityController),
  )
  app.get(
    '/export',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.exportUsersData,
        querystring: exportUsersDataQuerySchema,
      },
    },
    adaptRoute(ExportUsersDataController),
  )
  app.get(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.getUserProfile,
      },
    },
    adaptRoute(GetUserProfileController),
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.findUserByPublicId,
        params: findUserByPublicIdParamsSchema,
      },
    },
    adaptRoute(FindUserByPublicIdController),
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      schema: {
        ...userSwaggerDocs.createUser,
        body: registerBodySchema,
      },
    },
    adaptRoute(CreateUserController),
  )
  app.post(
    '/sessions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        ...userSwaggerDocs.authenticate,
        body: authenticateBodySchema,
      },
    },
    adaptRoute(AuthenticateController),
  )
  app.post(
    '/sessions/refresh-token',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.refreshToken,
      },
    },
    adaptRoute(RefreshTokenController),
  )
  app.post(
    '/uploads/profile-image',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyMultipart],
      schema: {
        ...userSwaggerDocs.uploadProfileImage,
      },
    },
    adaptRoute(UploadProfileImageController),
  )
  app.post(
    '/forgot-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        ...userSwaggerDocs.forgotPassword,
        body: forgotPasswordBodySchema,
      },
    },
    adaptRoute(ForgotPasswordController),
  )
  app.post(
    '/verify-email',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        ...userSwaggerDocs.verifyEmail,
        body: verifyEmailBodySchema,
      },
    },
    adaptRoute(VerifyEmailController),
  )

  // PATCH
  app.patch(
    '/reset-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        ...userSwaggerDocs.resetPassword,
        body: resetPasswordBodySchema,
      },
    },
    adaptRoute(ResetPasswordController),
  )
  app.patch(
    '/change-password',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.changePassword,
        body: changePasswordBodySchema,
      },
    },
    adaptRoute(ChangePasswordController),
  )
  app.patch(
    '/request-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.requestEmailChange,
        body: requestEmailChangeBodySchema,
      },
    },
    adaptRoute(RequestEmailChangeController),
  )
  app.patch(
    '/confirm-email-change',
    {
      ...rateLimit(RATE_LIMIT_TIERS.AUTH),
      schema: {
        ...userSwaggerDocs.confirmEmailChange,
        body: confirmEmailChangeBodySchema,
      },
    },
    adaptRoute(ConfirmEmailChangeController),
  )
  app.patch(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.updateUser,
        body: updateBodySchema,
      },
    },
    adaptRoute(UpdateUserController),
  )
  app.patch(
    '/update/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.updateUser,
        body: updateBodySchema,
      },
    },
    adaptRoute(UpdateUserController),
  )
  app.patch(
    '/:publicId/review-membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.reviewMembershipStatus,
        params: reviewMembershipStatusParamsSchema,
        body: reviewMembershipStatusBodySchema,
      },
    },
    adaptRoute(ReviewMembershipStatusController),
  )
  app.patch(
    '/:publicId/membership-status',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.updateMembershipStatus,
        params: updateMembershipStatusParamsSchema,
        body: updateMembershipStatusBodySchema,
      },
    },
    adaptRoute(UpdateMembershipStatusController),
  )
  app.patch(
    '/:publicId/permissions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.updateUserPermissions,
        params: updateUserPermissionsParamsSchema,
        body: updateUserPermissionsBodySchema,
      },
    },
    adaptRoute(UpdateUserPermissionsController),
  )
  app.patch(
    '/transfer-admin',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.transferAdminRole,
        body: transferAdminRoleBodySchema,
      },
    },
    adaptRoute(TransferAdminRoleController),
  )

  // DELETE
  app.delete(
    '/sessions',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.logout,
      },
    },
    adaptRoute(LogoutController),
  )
  app.delete(
    '/me',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt],
      schema: {
        ...userSwaggerDocs.deleteUser,
      },
    },
    adaptRoute(DeleteUserController),
  )
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.deleteUserByAdmin,
        params: deleteUserByAdminParamsSchema,
      },
    },
    adaptRoute(DeleteUserByAdminController),
  )
}
