import {
  STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
  STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class DirectorBoardUrlBuilderService {
  buildTempProfileImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_TEMP_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE, filename)
  }

  buildProfileImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE, buildShardFileFolder(filename), filename)
  }
}
