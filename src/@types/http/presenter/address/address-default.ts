import type { Address } from '@prisma/generated/client'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface AddressDefaultPresenterInput extends Address {}

export const httpAddressSchema = z.object({
  zip: nonemptyTextSchema,
  number: nonemptyTextSchema,
  street: nonemptyTextSchema,
  district: nonemptyTextSchema,
  city: nonemptyTextSchema,
  complement: nullableTextSchema,
})

export type HTTPAddress = z.infer<typeof httpAddressSchema>
