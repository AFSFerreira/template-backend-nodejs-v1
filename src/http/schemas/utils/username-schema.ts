import { limitedNonemptyTextSchema } from './limited-nonempty-text-schema'

export const usernameSchema = limitedNonemptyTextSchema.min(5)
