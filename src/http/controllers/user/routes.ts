import { upload } from '@/lib/multer'
import { authentication } from '@/middlewares/authentication'
import { verifyPermissions } from '@/middlewares/verifyPermissions'
import { authenticateSchema } from '@/schemas/user/authenticate-schema'
import { createUserSchema } from '@/schemas/user/create-user-schema'
import { exportUserDataSchema } from '@/schemas/user/export-user-data-schema'
import { logoutSchema } from '@/schemas/user/logout-schema'
import { refreshTokenSchema } from '@/schemas/user/refresh-token-schema'
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
      schema: exportUserDataSchema,
      validatorCompiler: () => () => true
    },
    exportUserData,
  )

  app.post(
    '/users',
    { 
      preHandler: [upload.single('profileImage')], 
      schema: createUserSchema,
      validatorCompiler: () => () => true
    },
    register,
  )

  app.post('/sessions', { 
    schema: authenticateSchema,
    validatorCompiler: () => () => true
  }, authenticate)

  app.post(
    '/sessions/refresh-token',
    { 
      schema: refreshTokenSchema,
      validatorCompiler: () => () => true
    },
    refreshToken,
  )

  app.delete(
    '/sessions',
    { 
      preHandler: [authentication], 
      schema: logoutSchema,
      validatorCompiler: () => () => true
    },
    logout,
  )
}
