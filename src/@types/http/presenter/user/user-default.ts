import type { User } from '@prisma/generated/client'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { identityTypeEnumSchema } from '@lib/zod/utils/enums/identity-type-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableNumberSchema } from '@lib/zod/utils/primitives/nullable-number-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { optionalNullableTextSchema } from '@lib/zod/utils/primitives/optional-nullable-text-schema'
import z from 'zod'

export interface UserDefaultPresenterInput extends User {}

const httpUserSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  username: nonemptyTextSchema,
  role: userRoleEnumSchema,
  profileImage: nonemptyTextSchema,
  birthdate: optionalNullableTextSchema,
  linkLattes: nullableTextSchema,
  linkGoogleScholar: nullableTextSchema,
  linkResearcherId: nullableTextSchema,
  orcidNumber: nullableTextSchema,
  departmentName: nullableTextSchema,
  institutionComplement: nullableTextSchema,
  occupation: occupationEnumSchema.nullable(),
  educationLevel: educationLevelSchema,
  identityType: identityTypeEnumSchema,
  identityDocument: nonemptyTextSchema,
  emailIsPublic: booleanSchema,
  astrobiologyOrRelatedStartYear: nullableNumberSchema,
  interestDescription: nonemptyTextSchema,
  receiveReports: booleanSchema,
  publicInformation: nullableTextSchema,
})

export type HTTPUser = z.infer<typeof httpUserSchema>
