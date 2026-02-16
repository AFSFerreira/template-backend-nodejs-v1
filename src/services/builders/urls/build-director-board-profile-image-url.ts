import {
  STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
  STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import urlJoin from 'url-join'

export function buildTempDirectorBoardProfileImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE, filename)
}

export function buildDirectorBoardProfileImageUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE, buildShardFileFolder(filename), filename)
}
