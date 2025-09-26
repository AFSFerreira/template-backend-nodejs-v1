import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import type { FastifyInstance } from 'fastify'
import { findMeetingByPublicId } from './find-meeting-by-public-id.controller'
import { getAllMeetings } from './get-all-meetings.controller'
import { registerUserMeeting } from './register-user-meeting.controller'
import { registerGuestMeeting } from './register-guest-meeting.controller'

export async function meetingRoutes(app: FastifyInstance) {
  app.get('/', getAllMeetings)
  app.get('/:publicId', findMeetingByPublicId)
  app.post(
    '/:meetingId/register-user',
    {
      preHandler: [verifyJwt],
    },
    registerUserMeeting,
  )
  app.post('/:meetingId/register-guest', registerGuestMeeting)
}
