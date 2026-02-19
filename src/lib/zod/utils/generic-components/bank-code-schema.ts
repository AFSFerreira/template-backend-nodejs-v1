import { VALID_BANK_CODES } from '@constants/sets'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const bankCodeSchema = limitedNonemptyTextSchema.refine((data) => VALID_BANK_CODES.has(data))
