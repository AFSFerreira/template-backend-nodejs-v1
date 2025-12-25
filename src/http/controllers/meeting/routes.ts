import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { getRequestUserPublicId } from '@services/http/get-request-user-public-id'
import { rateLimit } from '@utils/http/rate-limit'
import { findMeetingByPublicId } from './find-meeting-by-public-id.controller'
import { getAllMeetings } from './get-all-meetings.controller'
import { registerGuestMeeting } from './register-guest-meeting.controller'
import { registerUserMeeting } from './register-user-meeting.controller'

export async function meetingRoutes(app: FastifyInstance) {
  app.get('/', getAllMeetings)
  app.get('/:publicId', findMeetingByPublicId)

  app.post(
    '/:meetingId/register-user',
    {
      ...rateLimit({
        max: 10,
        timeWindow: '1m',
        keyGenerator: getRequestUserPublicId,
      }),
      preHandler: [verifyJwt],
    },
    registerUserMeeting,
  )
  app.post(
    '/:meetingId/register-guest',
    {
      ...rateLimit({ max: 60, timeWindow: '1m' }),
    },
    registerGuestMeeting,
  )
}
