import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { deleteMeetingEnrollment } from './delete-meeting-enrollment.controller'
import { getMeetingEnrollment } from './get-meeting-enrollment.controller'

export async function meetingEnrollmentRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/:publicId',
    {
      ...rateLimit({ max: 100, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getMeetingEnrollment,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit({ max: 30, timeWindow: '1m' }),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteMeetingEnrollment,
  )
}
