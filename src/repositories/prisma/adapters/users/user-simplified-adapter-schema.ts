import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const userSimplifiedAdapterSchema = z
  .object({
    id: modelPublicIdSchema,
    public_id: nonemptyTextSchema,
    full_name: nonemptyTextSchema,
    role: userRoleEnumSchema,
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
    email: raw.email,
    emailIsPublic: raw.email_is_public,
    institutionName: raw.institution_name,
    state: raw.state,
  }))
