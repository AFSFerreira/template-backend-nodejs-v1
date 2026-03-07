import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface UserSimplifiedPresenterInput extends CustomUserWithSimplifiedDetails {}
export type UserWithSimplifiedDetails = CustomUserWithSimplifiedDetails

const httpSimplifiedUserDetailsSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  institutionName: nullableTextSchema,
  state: nullableTextSchema,
  email: nullableTextSchema,
})

export type HTTPSimplifiedUserDetails = z.infer<typeof httpSimplifiedUserDetailsSchema>
