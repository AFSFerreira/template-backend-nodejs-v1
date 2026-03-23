import { ApplicationScheduler } from '../bullmq/helpers/application-scheduler'
import { ApplicationWorkerManager } from './helpers/application-worker-manager'

export const applicationWorkerManager = new ApplicationWorkerManager()

export const applicationScheduler = new ApplicationScheduler()
await applicationScheduler.startAll()
