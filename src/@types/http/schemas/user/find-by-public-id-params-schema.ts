import type { findUserByIdParamsSchema } from '@http/schemas/user/find-by-public-id-params-schema'
import type z from 'zod'

export type FindUserByIdParamsType = typeof findUserByIdParamsSchema

export type FindUserByIdParamsSchemaType = z.infer<FindUserByIdParamsType>
