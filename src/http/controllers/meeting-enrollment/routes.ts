import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { deleteMeetingEnrollment } from './delete-meeting-enrollment.controller'
import { exportMeetingEnrollments } from './export-meeting-enrollments.controller'
import { getMeetingEnrollment } from './get-meeting-enrollment.controller'

export async function meetingEnrollmentRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/export',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      // preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    exportMeetingEnrollments,
  )

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
