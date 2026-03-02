import { meetingPresentationSchema } from '@lib/zod/utils/components/meeting/meeting-presentation-schema'
import z from 'zod'

export const registerUserMeetingBodySchema = z.object({
  meetingPresentationData: meetingPresentationSchema.optional(),
})
