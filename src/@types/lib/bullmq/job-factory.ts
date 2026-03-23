import type { AsyncJob } from './job'
import type { JobContext } from './job-context'

export type JobFactory = (ctx: JobContext) => AsyncJob
