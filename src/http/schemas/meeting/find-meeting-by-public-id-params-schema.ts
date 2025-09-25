import { uuidv7Schema } from '@schemas/utils/primitives/uuidv7-schema'
import z from 'zod'

export const findMeetingByPublicIdParamsSchema = z.object({
  publicId: uuidv7Schema,
})

export type FindMeetingByPublicIdParamsSchemaType = z.infer<typeof findMeetingByPublicIdParamsSchema>
