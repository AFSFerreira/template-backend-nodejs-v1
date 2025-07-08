import { upload } from '@/lib/multer'
import { authentication } from '@/middlewares/authentication'
import { verifyPermissions } from '@/middlewares/verifyPermissions'
import { authenticateSwaggerSchema } from '@/swagger-schemas/user/authenticate-schema'
import { createUserSwaggerSchema } from '@/swagger-schemas/user/create-user-schema'
import { exportUserDataSwaggerSchema } from '@/swagger-schemas/user/export-user-data-schema'
import { logoutSwaggerSchema } from '@/swagger-schemas/user/logout-schema'
import { refreshTokenSwaggerSchema } from '@/swagger-schemas/user/refresh-token-schema'
import { USER_ROLE } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { exportUserData } from './export-user-data'
import { logout } from './logout'
import { refreshToken } from './refresh-token'
import { register } from './register'

export async function userRoutes(app: FastifyInstance) {
  app.get(
    '/users/export',
    {
      preHandler: [authentication, verifyPermissions([USER_ROLE.ADMIN])],
      schema: exportUserDataSwaggerSchema,
      validatorCompiler: () => () => true,
    },
    exportUserData,
  )

  app.post(
    '/users',
    {
      preHandler: [upload.single('profileImage')],
      schema: createUserSwaggerSchema,
      validatorCompiler: () => () => true,
    },
    register,
  )

  app.post(
    '/sessions',
    {
      schema: authenticateSwaggerSchema,
      validatorCompiler: () => () => true,
    },
    authenticate,
  )

  app.post(
    '/sessions/refresh-token',
    {
      schema: refreshTokenSwaggerSchema,
      validatorCompiler: () => () => true,
    },
    refreshToken,
  )

  app.delete(
    '/sessions',
    {
      preHandler: [authentication],
      schema: logoutSwaggerSchema,
      validatorCompiler: () => () => true,
    },
    logout,
  )
}
