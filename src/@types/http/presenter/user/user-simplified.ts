import type { User } from '@prisma/generated/client'
import { modelIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export type UserSimplifiedPresenterInput = User
export type UserWithSimplifiedDetails = User

export const httpSimplifiedUserDetailsSchema = z.object({
  id: modelIdSchema,
  fullName: nonemptyTextSchema,
  email: nullableTextSchema,
})

export type HTTPSimplifiedUserDetails = z.infer<typeof httpSimplifiedUserDetailsSchema>
