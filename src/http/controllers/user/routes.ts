import { upload } from '@lib/multer'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { UserRoleType } from '@prisma/client'
import { rateLimit } from '@utils/rate-limit'
import type { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { checkAvailability } from './check-availability.controller'
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
import { uploadRegisterProfileImage } from './upload-register-profile-image.controller'

export async function userRoutes(app: FastifyInstance) {
  // Admin Routes:
  app.get(
    '/all-users-detailed',
    {
      preHandler: [
        verifyJwt,
        verifyUserRole([UserRoleType.ADMIN, UserRoleType.MANAGER]),
      ],
    },
    getAllUsersDetailed,
  )
  app.get(
    '/export',
    {
      preHandler: [
        verifyJwt,
        verifyUserRole([UserRoleType.ADMIN, UserRoleType.MANAGER]),
      ],
    },
    exportUsersData,
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
  app.get('/:publicId', getUserByPublicId)

  // Register Routes:
  app.post(
    '/',
    {
      preHandler: [upload.single('profileImage')],
      ...rateLimit({ max: 2, timeWindow: '1d' }),
    },
    register,
  )
  app.post(
    '/uploads/profile-image',
    {
      preHandler: [upload.single('profileImage')],
      ...rateLimit({ max: 5, timeWindow: '30s' }),
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
      ...rateLimit({ max: 10, timeWindow: '60m' }),
    },
    forgotPassword,
  )
  app.patch('/reset-password', resetPassword)
  app.delete(
    '/sessions',
    {
      preHandler: [verifyJwt],
    },
    logout,
  )
}
