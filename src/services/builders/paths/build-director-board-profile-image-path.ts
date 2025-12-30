import path from 'node:path'
import { DIRECTOR_BOARD_PROFILE_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { buildShardFileFolder } from '@utils/files/build-shard-file-folder'

export function buildDirectorBoardProfileImagePath(filename: string) {
  return path.resolve(DIRECTOR_BOARD_PROFILE_IMAGES_PATH, buildShardFileFolder(filename), filename)
}
