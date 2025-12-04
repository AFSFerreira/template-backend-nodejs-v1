import z from 'zod'
import { addressSchema } from '../address/address-schema'

export const otherRootFieldsSchema = z.object({
  address: addressSchema,
})
