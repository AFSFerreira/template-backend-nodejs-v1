import path from 'node:path'
import {
  DIRECTOR_BOARD_PROFILE_IMAGES_PATH,
  DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH,
} from '@constants/dynamic-file-constants'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'

export function buildDirectorBoardTempProfileImagePath(filename: string) {
  return path.resolve(DIRECTOR_BOARD_TEMP_PROFILE_IMAGES_PATH, filename)
}

export function buildDirectorBoardProfileImagePath(filename: string) {
  return path.resolve(DIRECTOR_BOARD_PROFILE_IMAGES_PATH, buildShardFileFolder(filename), filename)
}
