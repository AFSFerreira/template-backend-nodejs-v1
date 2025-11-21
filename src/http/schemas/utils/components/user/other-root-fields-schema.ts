import z from 'zod'
import { addressSchema } from '../../generic-components/address-schema'

export const otherRootFieldsSchema = z.object({
  address: addressSchema,
})
