import type { User } from '@prisma/generated/client'
import { modelIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { optionalNullableTextSchema } from '@lib/zod/utils/primitives/optional-nullable-text-schema'
import z from 'zod'

export type UserDefaultPresenterInput = User

export const httpUserSchema = z.object({
  id: modelIdSchema,
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  username: nonemptyTextSchema,
  birthdate: optionalNullableTextSchema,
})

export type HTTPUser = z.infer<typeof httpUserSchema>
