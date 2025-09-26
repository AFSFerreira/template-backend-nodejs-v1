import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

export const registerGuestMeetingParamsSchema = z.object({
  meetingId: uuidv7Schema,
})

export type RegisterGuestMeetingParamsSchemaType = z.infer<typeof registerGuestMeetingParamsSchema>
