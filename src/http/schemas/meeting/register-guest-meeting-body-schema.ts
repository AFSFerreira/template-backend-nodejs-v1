import { emailSchema } from '@schemas/utils/components/email-schema'
import { presentationSchema } from '@schemas/utils/components/presentation-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

const registerGuestMeetingBodySchema = z.object({
  meetingPresentationData: presentationSchema.optional(),
  guestEmail: emailSchema,
  guestFullName: upperCaseTextSchema,
})

export type RegisterGuestMeetingBodySchemaType = z.infer<typeof registerGuestMeetingBodySchema>
