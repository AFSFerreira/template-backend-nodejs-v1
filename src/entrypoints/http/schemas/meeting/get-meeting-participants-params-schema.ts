import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { z } from 'zod'

export const getMeetingParticipantsParamsSchema = z.object({
  meetingPublicId: modelPublicIdSchema,
})
