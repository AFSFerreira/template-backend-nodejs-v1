import { emailSchema } from '@schemas/utils/components/email-schema'
import { presentationSchema } from '@schemas/utils/components/presentation-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-schema'
import { occupationSchema } from '@schemas/utils/enums/occupation-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const registerGuestMeetingBodySchema = z.object({
  meetingPresentationData: presentationSchema.optional(),
  email: emailSchema,
  fullName: upperCaseTextSchema,
  institutionName: upperCaseTextSchema,
  departmentName: upperCaseTextSchema,
  occupation: occupationSchema,
  educationLevel: educationLevelSchema,
  wantsNewsletter: booleanSchema,
})

export type RegisterGuestMeetingBodySchemaType = z.infer<typeof registerGuestMeetingBodySchema>
