import type { UserWithDetailsDecrypted } from '@custom-types/validators/user-with-details-decrypted'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { identityTypeEnumSchema } from '@lib/zod/utils/enums/identity-type-enum-schema'
import { membershipStatusEnumSchema } from '@lib/zod/utils/enums/membership-status-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { userRoleEnumSchema } from '@lib/zod/utils/enums/user-role-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { nonemptyTextArraySchema } from '@lib/zod/utils/primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableNumberSchema } from '@lib/zod/utils/primitives/nullable-number-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { optionalBooleanSchema } from '@lib/zod/utils/primitives/optional-boolean-schema'
import { optionalNonemptyTextArraySchema } from '@lib/zod/utils/primitives/optional-nonempty-text-array-schema'
import { optionalNonemptyTextSchema } from '@lib/zod/utils/primitives/optional-nonempty-text-schema'
import { optionalNullableNumberSchema } from '@lib/zod/utils/primitives/optional-nullable-number-schema'
import { optionalNullableTextSchema } from '@lib/zod/utils/primitives/optional-nullable-text-schema'
import { textSchema } from '@lib/zod/utils/primitives/text-schema'
import z from 'zod'

export type UserDetailedPresenterForAdminInput = UserWithDetailsDecrypted

export const httpAddressSchema = z.object({
  zip: textSchema,
  number: textSchema,
  street: textSchema,
  district: textSchema,
  city: textSchema,
  state: textSchema,
  country: textSchema,
  complement: optionalNullableTextSchema,
})

export const httpEnrolledCourseSchema = z.object({
  courseName: optionalNullableTextSchema,
  startGraduationDate: optionalNullableTextSchema,
  expectedGraduationDate: optionalNullableTextSchema,
  supervisorName: optionalNullableTextSchema,
  scholarshipHolder: optionalBooleanSchema,
  sponsoringOrganization: optionalNullableTextSchema,
})

export const httpAcademicPublicationSchema = z.object({
  title: nonemptyTextSchema,
  authors: nonemptyTextArraySchema,
  publicationYear: optionalNullableNumberSchema,
  journalName: nonemptyTextSchema,
  volume: nonemptyTextSchema,
  editionNumber: nonemptyTextSchema,
  startPage: nonemptyTextSchema,
  linkDoi: nonemptyTextSchema,
  area: nonemptyTextSchema,
})

export const httpDirectorBoardInfoSchema = z.object({
  profileImage: nonemptyTextSchema,
  name: nonemptyTextSchema,
  position: nonemptyTextSchema,
  linkLattes: optionalNullableTextSchema,
})

export const httpUserDetailsForAdminSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  email: nonemptyTextSchema,
  username: nonemptyTextSchema,
  role: userRoleEnumSchema.nullable(),
  birthdate: optionalNullableTextSchema,
  linkLattes: nullableTextSchema,
  linkGoogleScholar: nullableTextSchema,
  linkResearcherId: nullableTextSchema,
  orcidNumber: nullableTextSchema,
  institutionName: optionalNonemptyTextSchema,
  departmentName: nullableTextSchema,
  membershipStatus: membershipStatusEnumSchema,
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
  keywords: optionalNonemptyTextArraySchema,
  mainActivityArea: optionalNonemptyTextSchema,
  subActivityArea: optionalNonemptyTextSchema,
  address: httpAddressSchema.optional(),
  enrolledCourse: httpEnrolledCourseSchema.optional(),
  academicPublications: z.array(httpAcademicPublicationSchema).optional(),
})

export const httpUserWithDetailsForAdminSchema = httpUserDetailsForAdminSchema.extend({
  directorBoardInfo: httpDirectorBoardInfoSchema.nullable().optional(),
})

export type HTTPUserWithDetailsForAdmin = z.infer<typeof httpUserWithDetailsForAdminSchema>
