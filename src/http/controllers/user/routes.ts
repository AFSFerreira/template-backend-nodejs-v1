import { USER_ROLE } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportUserData } from './export-user-data'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'
import { upload } from '@/lib/multer'
import { authentication } from '@/middlewares/authentication'
import { verifyPermissions } from '@/middlewares/verifyPermissions'
import { authenticateSwaggerSchema } from '@/swagger-schemas/user/authenticate-schema'
import { createUserSwaggerSchema } from '@/swagger-schemas/user/create-user-schema'
import { exportUserDataSwaggerSchema } from '@/swagger-schemas/user/export-user-data-schema'
import { logoutSwaggerSchema } from '@/swagger-schemas/user/logout-schema'
import { refreshTokenSwaggerSchema } from '@/swagger-schemas/user/refresh-token-schema'
import { noValidation } from '@/utils/bypass-validation'
import { findById } from './find-by-id'

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/users/export',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
      schema: exportUserDataSwaggerSchema,
      ...noValidation,
    },
    exportUserData,
  )

  app.get(
    '/users/:userId',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
    },
    findById
  )

  app.post(
    '/users',
    {
      preHandler: [upload.single('profileImage')],
      schema: createUserSwaggerSchema,
      ...noValidation,
    },
    register,
  )

  app.post(
    '/sessions',
    {
      schema: authenticateSwaggerSchema,
      ...noValidation,
    },
    authenticate,
  )

  app.post(
    '/sessions/refresh-token',
    {
      schema: refreshTokenSwaggerSchema,
      ...noValidation,
    },
    refreshToken,
  )

  app.delete(
    '/sessions',
    {
      preHandler: [authentication],
      schema: logoutSwaggerSchema,
      ...noValidation,
    },
    logout,
  )
}
