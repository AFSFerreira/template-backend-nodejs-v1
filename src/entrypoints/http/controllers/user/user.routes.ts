import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { ADMIN_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { authenticateBodySchema } from '@http/schemas/user/authenticate-body-schema'
import { findUserByIdParamsSchema } from '@http/schemas/user/find-by-public-id-params-schema'
import { forgotPasswordBodySchema } from '@http/schemas/user/forgot-password-body-schema'
import { getAllUsersQuerySchema } from '@http/schemas/user/get-all-users-query-schema'
import { registerBodySchema } from '@http/schemas/user/register-body-schema'
import { resetPasswordBodySchema } from '@http/schemas/user/reset-password-body-schema'
import { changePasswordBodySchema } from '@http/schemas/user/update-password-body-schema'
import { updateBodySchema } from '@http/schemas/user/update-user-body-schema'
import { verifyEmailBodySchema } from '@http/schemas/user/verify-email-body-schema'
import { userSwaggerDocs } from '@lib/swagger/models/user'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { AuthenticateController } from './authenticate.controller'
import { ChangePasswordController } from './change-password.controller'
import { CreateUserController } from './create-user.controller'
import { DeleteUserController } from './delete-user.controller'
import { FindUserByIdController } from './find-user-by-public-id.controller'
import { ForgotPasswordController } from './forgot-password.controller'
import { GetAllUsersController } from './get-all-users.controller'
import { LogoutController } from './logout.controller'
import { RefreshTokenController } from './refresh-token.controller'
import { ResetPasswordController } from './reset-password.controller'
import { UpdateUserController } from './update-user.controller'
import { VerifyEmailController } from './verify-email.controller'

export async function userRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...userSwaggerDocs.getAllUsers,
        querystring: getAllUsersQuerySchema,
      },
    },
    adaptRoute(GetAllUsersController),
  )
  app.get(
    '/:id',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(ADMIN_PERMISSIONS)],
      schema: {
        ...userSwaggerDocs.findUserById,
        params: findUserByIdParamsSchema,
      },
    },
    adaptRoute(FindUserByIdController),
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
}
