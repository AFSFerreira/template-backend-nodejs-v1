import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { usernameSchema } from '@lib/zod/utils/generic-components/username-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { z } from 'zod'

export const registerBodySchema = z.object({
  fullName: limitedNonemptyTextSchema,
  birthdate: dateSchema,
  username: usernameSchema,
  email: emailSchema,
  password: limitedNonemptyTextSchema,
})
