import {
  STATIC_BLOG_BANNERS_IMAGE_ROUTE,
  STATIC_BLOG_IMAGE_ROUTE,
  STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class BlogUrlBuilderService {
  buildTempBlogImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_TEMP_BLOG_BANNERS_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
  }

  buildBlogImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_BLOG_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
  }

  buildBlogBannerUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, buildShardFileFolder(filename), filename)
  }
}
