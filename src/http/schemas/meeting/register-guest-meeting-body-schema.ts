import { emailSchema } from '@schemas/utils/components/email-schema'
import { presentationSchema } from '@schemas/utils/components/presentation-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const registerGuestMeetingBodySchema = z.object({
  meetingPresentationData: presentationSchema.optional(),
  email: emailSchema,
  fullName: upperCaseTextSchema,
  institutionName: upperCaseTextSchema,
  
})

export type RegisterGuestMeetingBodySchemaType = z.infer<typeof registerGuestMeetingBodySchema>
