import type { CustomUserWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/user-simplified'
import type { UserRoleType } from '@prisma/generated/enums'
import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { optionalNonemptyTextSchema } from '@lib/zod/utils/primitives/optional-nonempty-text-schema'
import z from 'zod'

export interface UserSimplifiedForAdminPresenterInput extends CustomUserWithSimplifiedDetails {
  role: UserRoleType
}

const httpSimplifiedUserDetailsForAdminSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  institutionName: nullableTextSchema,
  state: optionalNonemptyTextSchema,
  email: nonemptyTextSchema,
  role: userRoleEnumSchema,
})

export type HTTPSimplifiedUserDetailsForAdmin = z.infer<typeof httpSimplifiedUserDetailsForAdminSchema>
