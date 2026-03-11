import { STATIC_USER_PROFILE_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class UserUrlBuilderService {
  buildProfileImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_USER_PROFILE_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
  }
}
