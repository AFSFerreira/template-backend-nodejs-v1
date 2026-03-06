import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { deleteMeetingEnrollmentParamsSchema } from '@http/schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import { getMeetingEnrollmentParamsSchema } from '@http/schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import { rateLimit } from '@utils/http/rate-limit'
import { deleteMeetingEnrollment } from './delete-meeting-enrollment.controller'
import { getMeetingEnrollment } from './get-meeting-enrollment.controller'

export async function meetingEnrollmentRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: getMeetingEnrollmentParamsSchema,
      },
    },
    getMeetingEnrollment,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: deleteMeetingEnrollmentParamsSchema,
      },
    },
    deleteMeetingEnrollment,
  )
}
