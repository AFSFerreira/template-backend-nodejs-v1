import { meetingPresentationSchema } from '@schemas/utils/generic-components/meeting-presentation-schema'
import z from 'zod'

export const registerUserMeetingBodySchema = z.object({
  meetingPresentationData: meetingPresentationSchema.optional(),
})
