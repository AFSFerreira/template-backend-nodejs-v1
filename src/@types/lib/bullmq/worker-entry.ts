import type { Queue, Worker } from 'bullmq'

export interface WorkerEntry {
  worker: Worker
  queue: Queue
}
