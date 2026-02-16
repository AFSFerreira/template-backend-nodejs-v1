import type { FastifyInstance } from 'fastify'
import { RATE_LIMIT_TIERS } from '@constants/route-configuration-constants'
import { MANAGER_PERMISSIONS } from '@constants/sets'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyMultipart } from '@middlewares/verify-multipart.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { rateLimit } from '@utils/http/rate-limit'
import { createMeeting } from './create-meeting.controller'
import { deleteMeeting } from './delete-meeting.controller'
import { findMeetingByPublicId } from './find-meeting-by-public-id.controller'
import { getAllMeetings } from './get-all-meetings.controller'
import { getMeetingParticipants } from './get-meeting-participants.controller'
import { registerGuestMeeting } from './register-guest-meeting.controller'
import { registerUserMeeting } from './register-user-meeting.controller'
import { updateMeeting } from './update-meeting.controller'
import { uploadMeetingAgenda } from './upload-meeting-agenda.controller'
import { uploadMeetingBanner } from './upload-meeting-banner.controller'

export async function meetingRoutes(app: FastifyInstance) {
  // GET
  app.get(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    getAllMeetings,
  )
  app.get(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
    },
    findMeetingByPublicId,
  )
  app.get(
    '/:meetingPublicId/participants',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    getMeetingParticipants,
  )

  // POST
  app.post(
    '/',
    {
      ...rateLimit(RATE_LIMIT_TIERS.CREATE_RESOURCE),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    createMeeting,
  )
  app.post(
    '/:meetingId/register-user',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
      preHandler: [verifyJwt],
    },
    registerUserMeeting,
  )
  app.post(
    '/:meetingId/register-guest',
    {
      ...rateLimit(RATE_LIMIT_TIERS.STANDARD),
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
    },
    updateMeeting,
  )

  // DELETE
  app.delete(
    '/:publicId',
    {
      ...rateLimit(RATE_LIMIT_TIERS.MUTATION),
      preHandler: [verifyJwt, verifyUserRole(MANAGER_PERMISSIONS)],
    },
    deleteMeeting,
  )
}
