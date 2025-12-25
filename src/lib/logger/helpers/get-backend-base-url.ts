import { getRequestInfo } from './get-request-info'

export function getBackendBaseUrl() {
  const requestInfo = getRequestInfo()

  return `${requestInfo.protocol}://${requestInfo.host}`
}
