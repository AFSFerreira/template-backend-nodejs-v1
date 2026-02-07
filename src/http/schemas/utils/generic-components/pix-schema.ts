import { INVALID_PIX_KEY } from '@messages/validations/common-validations'
import { identify as validatePix } from 'pix-utils-js'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const pixSchema = limitedNonemptyTextSchema.refine(
  (data) => {
    try {
      return !!validatePix({ pix: data })
    } catch {
      return false
    }
  },
  { message: INVALID_PIX_KEY },
)
