import type { ExtendedFastifyInstance } from '@custom-types/custom/zod-fastify-instance'
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
import { meetingSwaggerDocs } from '@lib/swagger/models/meeting'
import { adaptRoute } from '@utils/http/adapt-route'
import { rateLimit } from '@utils/http/rate-limit'
import { CreateMeetingController } from './create-meeting.controller'
import { DeleteMeetingController } from './delete-meeting.controller'
import { ExportMeetingEnrollmentsController } from './export-meeting-enrollments.controller'
import { FindMeetingByPublicIdController } from './find-meeting-by-public-id.controller'
import { GetAllMeetingsController } from './get-all-meetings.controller'
import { GetMeetingParticipantsController } from './get-meeting-participants.controller'
import { RegisterGuestMeetingController } from './register-guest-meeting.controller'
import { RegisterUserMeetingController } from './register-user-meeting.controller'
import { UpdateMeetingController } from './update-meeting.controller'
import { UploadMeetingAgendaController } from './upload-meeting-agenda.controller'
import { UploadMeetingBannerController } from './upload-meeting-banner.controller'

export async function meetingRoutes(app: ExtendedFastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...meetingSwaggerDocs.getAllMeetings,
        querystring: getAllMeetingsQuerySchema,
      },
    },
    adaptRoute(GetAllMeetingsController),
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...meetingSwaggerDocs.findMeetingByPublicId,
        params: findMeetingByPublicIdParamsSchema,
      },
    },
    adaptRoute(FindMeetingByPublicIdController),
  )
  app.get(
    '/:meetingPublicId/participants',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...meetingSwaggerDocs.getMeetingParticipants,
        params: getMeetingParticipantsParamsSchema,
        querystring: getMeetingParticipantsQuerySchema,
      },
    },
    adaptRoute(GetMeetingParticipantsController),
  )
  app.get(
    '/:publicId/export-enrollments',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...meetingSwaggerDocs.exportMeetingEnrollments,
        params: exportMeetingEnrollmentsParamsSchema,
        querystring: exportMeetingEnrollmentsQuerySchema,
      },
    },
    adaptRoute(ExportMeetingEnrollmentsController),
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...meetingSwaggerDocs.createMeeting,
        body: createMeetingBodySchema,
      },
    },
    adaptRoute(CreateMeetingController),
  )
  app.post(
    '/:meetingId/register-user',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
      schema: {
        ...meetingSwaggerDocs.registerUserMeeting,
        params: registerUserMeetingParamsSchema,
        body: registerUserMeetingBodySchema,
      },
    },
    adaptRoute(RegisterUserMeetingController),
  )
  app.post(
    '/:meetingId/register-guest',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      schema: {
        ...meetingSwaggerDocs.registerGuestMeeting,
        params: registerGuestMeetingParamsSchema,
        body: registerGuestMeetingBodySchema,
      },
    },
    adaptRoute(RegisterGuestMeetingController),
  )
  app.post(
    '/uploads/banner',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...meetingSwaggerDocs.uploadMeetingBanner,
      },
    },
    adaptRoute(UploadMeetingBannerController),
  )
  app.post(
    '/uploads/agenda',
    {
      ...rateLimit(RATE_LIMIT_TIERS.HEAVY),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS), verifyMultipart],
      schema: {
        ...meetingSwaggerDocs.uploadMeetingAgenda,
      },
    },
    adaptRoute(UploadMeetingAgendaController),
  )

  // PATCH
  app.patch(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...meetingSwaggerDocs.updateMeeting,
        params: updateMeetingParamsSchema,
        body: updateMeetingBodySchema,
      },
    },
    adaptRoute(UpdateMeetingController),
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
      schema: {
        ...meetingSwaggerDocs.deleteMeeting,
        params: deleteMeetingParamsSchema,
      },
    },
    adaptRoute(DeleteMeetingController),
  )
}
