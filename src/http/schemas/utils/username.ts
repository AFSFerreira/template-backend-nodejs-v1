import { limitedNonemptyTextSchema } from './limited-nonempty-text'

export const usernameSchema = limitedNonemptyTextSchema.min(5)
