import { limitedNonemptyTextSchema } from './limited-nonempty-text'

export const upperCaseTextSchema = limitedNonemptyTextSchema.toUpperCase()
