import {
  STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE,
  STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE,
} from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'
import { injectable } from 'tsyringe'
import urlJoin from 'url-join'

@injectable()
export class InstitutionalInfoUrlBuilderService {
  buildTempAboutImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_TEMP_INSTITUTIONAL_ABOUT_IMAGE_ROUTE, filename)
  }

  buildAboutImageUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
  }

  buildStatuteUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
  }

  buildElectionNoticeUrl(filename: string): string {
    const backendBaseUrl = getBackendBaseUrlStored()
    return urlJoin(backendBaseUrl, STATIC_INSTITUTIONAL_INFO_DOCUMENTS_ROUTE, filename)
  }
}
