import { STATIC_SLIDER_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class SliderImageUrlBuilderService {
  buildImageUrl(filename: string, ...pathSegments: string[]): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_SLIDER_IMAGES_ROUTE, ...pathSegments, filename)
  }
}
