import path from 'node:path'
import { DIRECTOR_BOARD_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'

export function buildDirectorBoardProfileImagePath(filename: string) {
  return path.resolve(DIRECTOR_BOARD_PROFILE_IMAGES_PATH, filename)
}
