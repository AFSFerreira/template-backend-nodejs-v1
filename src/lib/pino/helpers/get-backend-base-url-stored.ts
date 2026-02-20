import { getRequestInfoStored } from './get-request-info-stored'

export function getBackendBaseUrlStored() {
  const requestInfo = getRequestInfoStored()

  return `${requestInfo.protocol}://${requestInfo.host}`
}
