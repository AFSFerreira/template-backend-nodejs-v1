import { STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import urlJoin from 'url-join'

export function buildDirectorBoardProfileImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrl()
  return urlJoin(backendBaseUrl, STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE, filename)
}
