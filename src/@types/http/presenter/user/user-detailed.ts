import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { identityTypeEnumSchema } from '@lib/zod/utils/enums/identity-type-enum-schema'
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
import z from 'zod'

export interface UserDetailedPresenterInput extends UserWithDetails {}

const httpAddressSchema = z.object({
  zip: optionalNonemptyTextSchema,
  number: optionalNonemptyTextSchema,
  street: optionalNonemptyTextSchema,
  district: optionalNonemptyTextSchema,
  city: optionalNonemptyTextSchema,
  state: optionalNonemptyTextSchema,
  country: optionalNonemptyTextSchema,
  complement: optionalNullableTextSchema,
})

const httpEnrolledCourseSchema = z.object({
  courseName: optionalNullableTextSchema,
  startGraduationDate: optionalNullableTextSchema,
  expectedGraduationDate: optionalNullableTextSchema,
  supervisorName: optionalNullableTextSchema,
  scholarshipHolder: optionalBooleanSchema,
  sponsoringOrganization: optionalNullableTextSchema,
})

const httpAcademicPublicationSchema = z.object({
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

const httpDirectorBoardInfoSchema = z.object({
  profileImage: nonemptyTextSchema,
  name: nonemptyTextSchema,
  position: nonemptyTextSchema,
  linkLattes: optionalNullableTextSchema,
})

const httpUserDetailsSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  username: nonemptyTextSchema,
  role: userRoleEnumSchema.nullable(),
  birthdate: optionalNullableTextSchema,
  linkLattes: nullableTextSchema,
  linkGoogleScholar: nullableTextSchema,
  linkResearcherId: nullableTextSchema,
  orcidNumber: nullableTextSchema,
  institutionName: optionalNonemptyTextSchema,
  departmentName: nullableTextSchema,
  institutionComplement: nullableTextSchema,
  occupation: occupationEnumSchema.nullable(),
  educationLevel: educationLevelSchema,
  identityType: identityTypeEnumSchema,
  identityDocument: nonemptyTextSchema,
  emailIsPublic: booleanSchema,
  astrobiologyOrRelatedStartYear: nullableNumberSchema,
  receiveReports: booleanSchema,
  publicInformation: nullableTextSchema,
  keywords: optionalNonemptyTextArraySchema,
  mainActivityArea: optionalNonemptyTextSchema,
  subActivityArea: optionalNonemptyTextSchema,
  address: httpAddressSchema.optional(),
  enrolledCourse: httpEnrolledCourseSchema.optional(),
  academicPublications: z.array(httpAcademicPublicationSchema).optional(),
})

const httpUserWithDetailsSchema = httpUserDetailsSchema.extend({
  directorBoardInfo: httpDirectorBoardInfoSchema.nullable().optional(),
})

export type HTTPUserWithDetails = z.infer<typeof httpUserWithDetailsSchema>
