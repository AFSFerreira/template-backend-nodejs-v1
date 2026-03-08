import { membershipStatusEnumSchema } from '@lib/zod/utils/enums/membership-status-enum-schema'
import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { integerSchema } from '@lib/zod/utils/primitives/integer-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const userSimplifiedAdapterSchema = z
  .object({
    id: integerSchema,
    public_id: modelPublicIdSchema,
    full_name: nonemptyTextSchema,
    role: userRoleEnumSchema,
    membership_status: membershipStatusEnumSchema,
    profile_image: nonemptyTextSchema,
    email: nonemptyTextSchema,
    email_is_public: booleanSchema,
    state: nonemptyTextSchema,
    institution_name: nonemptyTextSchema.nullable(),
  })
  .transform((raw) => ({
    id: raw.id,
    publicId: raw.public_id,
    role: raw.role,
    fullName: raw.full_name,
    profileImage: raw.profile_image,
    membershipStatus: raw.membership_status,
    email: raw.email,
    emailIsPublic: raw.email_is_public,
    institutionName: raw.institution_name,
    state: raw.state,
  }))
