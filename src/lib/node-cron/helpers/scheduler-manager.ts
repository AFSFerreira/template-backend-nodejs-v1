import type { JobFactory } from '@custom-types/libs/node-cron/job-factory'
import type { JobFactoryContext } from '@custom-types/libs/node-cron/job-factory-context'
import type { SchedulerOptions } from '@custom-types/libs/node-cron/scheduler-options'
import type { IStartJob } from '@custom-types/libs/node-cron/start-job'
import type Redis from 'ioredis'
import type { ScheduledTask, TaskOptions } from 'node-cron'
import type { Logger } from 'pino'
import { AVERAGE_CRON_JOB_TIME_EXECUTION } from '@constants/timing-constants'
import { SystemError } from '@errors/system-error'
import {
  JOB_STARTED_SUCESSFUL,
  RUNNING_JOB_FAILED,
  RUNNING_SCHEDULED_JOB,
  UNHANDLED_JOB_ERROR,
} from '@messages/loggings/scheduler-loggings'
import { INVALID_CRON_ERROR, JOB_NAME_ALREADY_EXISTS } from '@messages/system/common-responses'
import { cronSchema } from '@schemas/utils/generic-components/cron-schema'
import cron from 'node-cron'
import z from 'zod'
import { BASIC_JOB_CONFIGURATION } from '../configuration/base-configuration'

export class SchedulerManager {
  private tasks: Map<string, ScheduledTask>
  private factories: Map<string, JobFactoryContext>
  private logger?: Logger
  private redis?: Redis

  // Métricas:
  // private metricsCtx: MetricsContext
  // private runCounter?: Counter<string>
  // private errorCounter?: Counter<string>

  constructor(options: SchedulerOptions) {
    this.tasks = new Map<string, ScheduledTask>()
    this.factories = new Map<string, JobFactoryContext>()

    if (options.logger) {
      this.logger = options.logger
    }

    // if (options.promContext) {
    //   this.metricsCtx = { metricsClient: options.promContext.client, metricsPrefix: options.promContext.prefix ?? 'scheduler' }
    //   this.initMetrics()
    // }
  }

  // private initMetrics() {
  //   this.runCounter = new this.metricsCtx.metricsClient.Counter({
  //     name: `${this.metricsCtx.metricsPrefix}_runs_total`,
  //     help: 'Total scheduler runs',
  //     labelNames: ['job'],
  //   })

  //   this.errorCounter = new this.metricsCtx.metricsClient.Counter({
  //     name: `${this.metricsCtx.metricsPrefix}_errors_total`,
  //     help: 'Total scheduler errors',
  //     labelNames: ['job'],
  //   })
  // }

  register(jobName: string, cronExpr: string, factory: JobFactory, options?: TaskOptions) {
    const isValidCron = cronSchema.safeParse(cronExpr)

    if (!isValidCron.success) {
      throw new SystemError({
        ...INVALID_CRON_ERROR,
        issues: z.treeifyError(isValidCron.error),
      })
    }

    if (this.factories.has(jobName))
      throw new SystemError({
        ...JOB_NAME_ALREADY_EXISTS,
        message: `O job ${jobName} registrado já existe`,
      })

    this.factories.set(jobName, { cronExpr, factory, options })

    if (this.logger) {
      this.logger.info(`Job ${jobName} registrado -> ${cronExpr}`)
    }
  }

  async startAll() {
    for (const [name, { cronExpr, factory, options }] of this.factories.entries()) {
      await this.startJob({ name, cronExpr, factory, options })
    }
  }

  async startJob({ name, cronExpr, factory, options }: IStartJob) {
    if (this.tasks.has(name)) {
      if (this.logger) {
        this.logger.warn(`Job ${name} já está rodando`)
      }
      return
    }

    const jobFn = factory({ logger: this.logger })

    const wrapped = async () => {
      const lockKey = `locks:scheduler:${name}`
      let haveLock = true

      try {
        if (this.redis) {
          haveLock =
            (await this.redis.set(lockKey, process.pid.toString(), 'PX', AVERAGE_CRON_JOB_TIME_EXECUTION, 'NX')) !==
            null
        }

        if (!haveLock) {
          if (this.logger) {
            this.logger.debug(`Pulando job ${name} porque o lock não foi adquirido`)
          }
          return
        }

        // this.runCounter.inc({ job: name }, 1)

        if (this.logger) {
          this.logger.info({ job: name }, RUNNING_SCHEDULED_JOB)
        }

        await jobFn()
      } catch (error) {
        // this.errorCounter.inc({ job: name }, 1)

        if (this.logger) {
          this.logger.error({ job: name, error }, RUNNING_JOB_FAILED)
        }
      } finally {
        if (this.redis && haveLock) {
          await this.redis.del(lockKey)
        }
      }
    }

    const task = cron.schedule(
      cronExpr,
      () => {
        wrapped().catch((error) => {
          if (this.logger) {
            this.logger.error({ jobName: name, error }, UNHANDLED_JOB_ERROR)
          }
        })
      },
      {
        ...BASIC_JOB_CONFIGURATION,
        ...(options ? options : {}),
      },
    )

    this.tasks.set(name, task)

    if (this.logger) {
      this.logger.info({ job: name, cronExpr }, JOB_STARTED_SUCESSFUL)
    }
  }

  async stopJob(name: string) {
    const task = this.tasks.get(name)

    if (!task) {
      if (this.logger) {
        this.logger.warn(`Job ${name} não está em execução`)
      }
      return
    }

    await task.stop()
    await task.destroy()

    this.tasks.delete(name)

    if (this.logger) {
      this.logger.info(`O job ${name} parou`)
    }
  }

  status() {
    return Array.from(this.factories.keys()).map((name) => ({
      name,
      running: this.tasks.has(name),
    }))
  }
}
