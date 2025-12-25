import { urlSchema } from '@schemas/utils/primitives/url-schema'

export function isValidUrl(url: string) {
  return urlSchema.safeParse(url).success
}
