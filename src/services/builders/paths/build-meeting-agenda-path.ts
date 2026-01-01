import path from 'node:path'
import { MEETING_AGENDAS_PATH, MEETING_TEMP_AGENDAS_PATH } from '@constants/dynamic-file-constants'

export function buildTempMeetingAgendaPath(filename: string) {
  return path.resolve(MEETING_TEMP_AGENDAS_PATH, filename)
}

export function buildMeetingAgendaPath(filename: string) {
  return path.resolve(MEETING_AGENDAS_PATH, filename)
}
