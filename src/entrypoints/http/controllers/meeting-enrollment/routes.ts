import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { deleteMeetingEnrollment } from './delete-meeting-enrollment.controller'
import { getMeetingEnrollment } from './get-meeting-enrollment.controller'

export async function meetingEnrollmentRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getMeetingEnrollment,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteMeetingEnrollment,
  )
}
