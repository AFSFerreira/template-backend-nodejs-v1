import type { ZodFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@http/middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@http/middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@http/middlewares/verify-user-role.middleware'
import { createMeetingBodySchema } from '@http/schemas/meeting/create-meeting-body-schema'
import { deleteMeetingParamsSchema } from '@http/schemas/meeting/delete-meeting-params-schema'
import { exportMeetingEnrollmentsParamsSchema } from '@http/schemas/meeting/export-meeting-enrollments-params-schema'
import { exportMeetingEnrollmentsQuerySchema } from '@http/schemas/meeting/export-meeting-enrollments-query-schema'
import { findMeetingByPublicIdParamsSchema } from '@http/schemas/meeting/find-meeting-by-public-id-params-schema'
import { getAllMeetingsQuerySchema } from '@http/schemas/meeting/get-all-meetings-query-schema'
import { getMeetingParticipantsParamsSchema } from '@http/schemas/meeting/get-meeting-participants-params-schema'
import { getMeetingParticipantsQuerySchema } from '@http/schemas/meeting/get-meeting-participants-query-schema'
import { registerGuestMeetingBodySchema } from '@http/schemas/meeting/register-guest-meeting-body-schema'
import { registerGuestMeetingParamsSchema } from '@http/schemas/meeting/register-guest-meeting-params-schema'
import { registerUserMeetingBodySchema } from '@http/schemas/meeting/register-user-meeting-body-schema'
import { registerUserMeetingParamsSchema } from '@http/schemas/meeting/register-user-meeting-params-schema'
import { updateMeetingBodySchema } from '@http/schemas/meeting/update-meeting-body-schema'
import { updateMeetingParamsSchema } from '@http/schemas/meeting/update-meeting-params-schema'
import { rateLimit } from '@utils/http/rate-limit'
import { createMeeting } from './create-meeting.controller'
import { deleteMeeting } from './delete-meeting.controller'
import { exportMeetingEnrollments } from './export-meeting-enrollments.controller'
import { findMeetingByPublicId } from './find-meeting-by-public-id.controller'
import { getAllMeetings } from './get-all-meetings.controller'
import { getMeetingParticipants } from './get-meeting-participants.controller'
import { registerGuestMeeting } from './register-guest-meeting.controller'
import { registerUserMeeting } from './register-user-meeting.controller'
import { updateMeeting } from './update-meeting.controller'
import { uploadMeetingAgenda } from './upload-meeting-agenda.controller'
import { uploadMeetingBanner } from './upload-meeting-banner.controller'

export async function meetingRoutes(app: ZodFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        querystring: getAllMeetingsQuerySchema,
      },
    },
    getAllMeetings,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        params: findMeetingByPublicIdParamsSchema,
      },
    },
    findMeetingByPublicId,
  )
  app.get(
    '/:meetingPublicId/participants',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: getMeetingParticipantsParamsSchema,
        querystring: getMeetingParticipantsQuerySchema,
      },
    },
    getMeetingParticipants,
  )
  app.get(
    '/:publicId/export-enrollments',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: exportMeetingEnrollmentsParamsSchema,
        querystring: exportMeetingEnrollmentsQuerySchema,
      },
    },
    exportMeetingEnrollments,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        body: createMeetingBodySchema,
      },
    },
    createMeeting,
  )
  app.post(
    '/:meetingId/register-user',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        params: registerUserMeetingParamsSchema,
        body: registerUserMeetingBodySchema,
      },
    },
    registerUserMeeting,
  )
  app.post(
    '/:meetingId/register-guest',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        params: registerGuestMeetingParamsSchema,
        body: registerGuestMeetingBodySchema,
      },
    },
    registerGuestMeeting,
  )
  app.post(
    '/uploads/banner',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadMeetingBanner,
  )
  app.post(
    '/uploads/agenda',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
    },
    uploadMeetingAgenda,
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: updateMeetingParamsSchema,
        body: updateMeetingBodySchema,
      },
    },
    updateMeeting,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        params: deleteMeetingParamsSchema,
      },
    },
    deleteMeeting,
  )
}
