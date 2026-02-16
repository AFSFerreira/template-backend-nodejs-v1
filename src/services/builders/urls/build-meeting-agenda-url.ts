import { STATIC_MEETING_AGENDAS_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrlStored } from '@lib/logger/helpers/get-backend-base-url-stored'
import urlJoin from 'url-join'

export function buildMeetingAgendaUrl(filename: string): string {
  const backendBaseUrl = getBackendBaseUrlStored()
  return urlJoin(backendBaseUrl, STATIC_MEETING_AGENDAS_ROUTE, filename)
}
