import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'
import { meetingPresentationSchema } from '../utils/components/meeting/meeting-presentation-schema'

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
