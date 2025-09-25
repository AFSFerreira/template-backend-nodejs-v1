import type { FastifyInstance } from 'fastify'
import { findMeetingByPublicId } from './find-meeting-by-public-id.controller'
import { getAllMeetings } from './get-all-meetings.controller'

export async function meetingRoutes(app: FastifyInstance) {
  app.get('/', getAllMeetings)
  app.get('/:publicId', findMeetingByPublicId)
}
