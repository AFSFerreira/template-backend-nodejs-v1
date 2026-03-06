import z from 'zod'
import { meetingPresentationSchema } from '../utils/components/meeting/meeting-presentation-schema'

export const registerUserMeetingBodySchema = z.object({
  meetingPresentationData: meetingPresentationSchema.optional(),
})
