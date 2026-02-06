import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'
import { VALID_BANK_CODES } from '@constants/sets'

export const bankCodeSchema = limitedNonemptyTextSchema.refine((data) => VALID_BANK_CODES.has(data))
