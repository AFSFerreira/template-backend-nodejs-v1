// import { getRequestInfoStored } from './get-request-info-stored'

import { env } from '@env/index'

export function getBackendBaseUrlStored() {
  // const requestInfo = getRequestInfoStored()
  // return `${requestInfo.protocol}://${requestInfo.host}`

  return env.BACKEND_URL
}
