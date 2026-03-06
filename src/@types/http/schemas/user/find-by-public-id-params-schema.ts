import type { findUserByPublicIdParamsSchema } from '@http/schemas/user/find-by-public-id-params-schema'
import type z from 'zod'

export type FindUserByIdParamsType = typeof findUserByPublicIdParamsSchema

export type FindUserByIdParamsSchemaType = z.infer<FindUserByIdParamsType>
