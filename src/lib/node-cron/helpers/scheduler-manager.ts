import type { JobFactory } from '@custom-types/lib/node-cron/job-factory'
import type { JobFactoryContext } from '@custom-types/lib/node-cron/job-factory-context'
import type { SchedulerOptions } from '@custom-types/lib/node-cron/scheduler-options'
import type { IStartJob } from '@custom-types/lib/node-cron/start-job'
import type Redis from 'ioredis'
import type { ScheduledTask, TaskOptions } from 'node-cron'
import type { Logger } from 'pino'
import { AVERAGE_CRON_JOB_TIME_EXECUTION } from '@constants/timing-constants'
import { LOCK_SWAP_SCRIPT } from '@lib/redis/scripts/lock-swap-script'
import {
  JOB_STARTED_SUCESSFUL,
  RUNNING_JOB_FAILED,
  RUNNING_SCHEDULED_JOB,
  UNHANDLED_JOB_ERROR,
} from '@messages/loggings/system/scheduler-loggings'
import { cronSchema } from '@schemas/utils/generic-components/cron-schema'
import { InvalidCronExpressionError } from '@services/errors/cron/invalid-cron-expression-error'
import { JobNameAlreadyExistsError } from '@services/errors/jobs/job-name-already-exists-error'
import { HashService } from '@services/hashes/hash-service'
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
      throw new InvalidCronExpressionError(z.treeifyError(isValidCron.error).errors)
    }

    if (this.factories.has(jobName)) {
      throw new JobNameAlreadyExistsError(jobName)
    }

    this.factories.set(jobName, {
      cronExpr,
      factory,
      options: {
        ...BASIC_JOB_CONFIGURATION,
        ...options,
      },
    })

    this.logger?.info(`[SchedulerManager] Job ${jobName} registrado -> ${cronExpr}`)
  }

  async startAll() {
    this.logger?.info('[SchedulerManager] Iniciando todas as tarefas...')

    for (const [name, cronInfo] of this.factories.entries()) {
      await this.startJob({ ...cronInfo, name })
    }
  }

  async startJob({ name, cronExpr, factory, options }: IStartJob) {
    if (this.tasks.has(name)) {
      this.logger?.warn(`[SchedulerManager] Job ${name} está inicializando`)
      return
    }

    const jobFn = factory({ logger: this.logger })

    const wrapped = async () => {
      const lockKey = `locks:scheduler:${name}`
      const executionId = HashService.generateJobHash()
      let haveLock = true

      try {
        if (this.redis) {
          const result = await this.redis.set(lockKey, executionId, 'PX', AVERAGE_CRON_JOB_TIME_EXECUTION, 'NX')

          haveLock = result !== null
        }

        if (!haveLock) {
          this.logger?.debug(
            `[SchedulerManager] Lock não adquirido para o job ${name}. Outra instância está processando.`,
          )

          return
        }

        // this.runCounter.inc({ job: name }, 1)

        this.logger?.info({ job: name }, RUNNING_SCHEDULED_JOB)

        await jobFn()
      } catch (error) {
        // this.errorCounter.inc({ job: name }, 1)

        this.logger?.error({ job: name, error }, RUNNING_JOB_FAILED)
      } finally {
        if (this.redis && haveLock) {
          try {
            await this.redis.eval(LOCK_SWAP_SCRIPT, 1, lockKey, executionId)
          } catch (redisError) {
            this.logger?.error({ job: name, error: redisError }, 'Falha ao liberar lock no Redis')
          }
        }
      }
    }

    const task = cron.schedule(
      cronExpr,
      async () => {
        try {
          await wrapped()
        } catch (error) {
          this.logger?.error({ jobName: name, error }, UNHANDLED_JOB_ERROR)
        }
      },
      options,
    )

    this.tasks.set(name, task)

    this.logger?.info({ job: name, cronExpr }, JOB_STARTED_SUCESSFUL)
  }

  async stopAll() {
    this.logger?.info('[SchedulerManager] Parando todas as tarefas...')

    const jobsNames = Array.from(this.tasks.keys())

    jobsNames.forEach(async (jobName) => {
      await this.stopJob(jobName)
    })
  }

  async stopJob(name: string) {
    const task = this.tasks.get(name)

    if (!task) {
      this.logger?.warn(`[SchedulerManager] Job ${name} não está em execução`)
      return
    }

    await task.stop()
    this.tasks.delete(name)

    this.logger?.info(`[SchedulerManager] O job ${name} parou`)
  }

  status() {
    return Array.from(this.factories.keys()).map((name) => ({
      name,
      running: this.tasks.has(name),
    }))
  }
}
