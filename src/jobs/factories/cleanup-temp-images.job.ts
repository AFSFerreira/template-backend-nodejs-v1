import { JOBS_TIMEZONE } from '@constants/jobs-configuration-constants'
import cron from 'node-cron'
import { cleanupTempImages } from '../functions/cleanup-temp-images'

export function cleanupTempImagesJob() {
  cron.schedule('1 2 * * *', cleanupTempImages, { timezone: JOBS_TIMEZONE })
}
