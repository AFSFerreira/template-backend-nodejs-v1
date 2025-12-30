import path from 'node:path'
import { MEETING_BANNERS_PATH } from '@constants/dynamic-file-constants'

export function buildMeetingBannerPath(filename: string) {
  return path.resolve(MEETING_BANNERS_PATH, filename)
}
