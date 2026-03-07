import type { Meeting } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface MeetingDefaultPresenterInput extends Meeting {}

export const httpMeetingSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  description: nonemptyTextSchema,
  lastDate: dateSchema,
})

export type HTTPMeeting = z.infer<typeof httpMeetingSchema>
