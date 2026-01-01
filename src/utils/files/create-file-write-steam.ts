import { logError } from '@lib/logger/helpers/log-error'
import { FILE_WRITE_STREAM_CREATION_ERROR } from '@messages/loggings/file-loggings'
import fs from 'fs-extra'

export async function CreateFileWriteSteam(filename: string) {
  try {
    const fileStream = fs.createWriteStream(filename)
    return fileStream
  } catch (error) {
    logError({ error, context: { filename }, message: FILE_WRITE_STREAM_CREATION_ERROR })
    return null
  }
}
