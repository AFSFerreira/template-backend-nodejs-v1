import { textWithoutInnerSpacesSchema } from './text-without-inner-spaces-schema'

export const passwordSchema = textWithoutInnerSpacesSchema.min(8).max(2000)
