import { presentationSchema } from '@schemas/utils/generic-components/presentation-schema'
import z from 'zod'

export const registerUserMeetingBodySchema = z.object({
  meetingPresentationData: presentationSchema.optional(),
})

export type RegisterUserMeetingBodySchemaType = z.infer<typeof registerUserMeetingBodySchema>
