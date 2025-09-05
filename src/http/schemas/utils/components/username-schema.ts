import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const usernameSchema = limitedNonemptyTextSchema.min(3)
