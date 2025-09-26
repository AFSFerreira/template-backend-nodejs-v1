import { uuidv7Schema } from "@schemas/utils/primitives/uuidv7-schema"
import z from "zod"

export const registerUserMeetingParamsSchema = z.object({
  meetingId: uuidv7Schema,
})

export type RegisterUserMeetingParamsSchemaType = z.infer<typeof registerUserMeetingParamsSchema>
