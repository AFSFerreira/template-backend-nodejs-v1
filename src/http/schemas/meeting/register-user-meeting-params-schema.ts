import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import z from 'zod'

export const registerUserMeetingParamsSchema = z.object({
  meetingId: modelPublicIdSchema,
})
