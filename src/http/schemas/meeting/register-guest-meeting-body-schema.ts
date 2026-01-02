import { meetingPresentationSchema } from '@schemas/utils/components/meeting/meeting-presentation-schema'
import { educationLevelSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@schemas/utils/enums/occupation-enum-schema'
import { emailSchema } from '@schemas/utils/generic-components/email-schema'
import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const registerGuestMeetingBodySchema = z.object({
  meetingPresentationData: meetingPresentationSchema.optional(),
  email: emailSchema,
  fullName: upperCaseTextSchema,
  institutionName: upperCaseTextSchema,
  departmentName: upperCaseTextSchema,
  occupation: occupationEnumSchema,
  educationLevel: educationLevelSchema,
  wantsNewsletter: booleanSchema,
})
