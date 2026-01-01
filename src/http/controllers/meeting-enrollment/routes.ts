import type { FastifyInstance } from 'fastify'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { deleteMeetingEnrollment } from './delete-meeting-enrollment.controller'
import { getMeetingEnrollment } from './get-meeting-enrollment.controller'

export async function meetingEnrollmentRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getMeetingEnrollment,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteMeetingEnrollment,
  )
}
