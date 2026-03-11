import { STATIC_NEWSLETTER_IMAGES_ROUTE, STATIC_TEMP_NEWSLETTER_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class NewsletterUrlBuilderService {
  buildTempImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_TEMP_NEWSLETTER_IMAGES_ROUTE, filename)
  }

  buildImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_NEWSLETTER_IMAGES_ROUTE, buildShardFileFolder(filename), filename)
  }

  buildHtmlUrl(publicId: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, 'newsletters', publicId, 'content')
  }
}
