import { env } from '@env/index'

export const IS_DEV = env.NODE_ENV === 'development'
export const IS_DEBUG = env.LOG_LEVEL === 'debug'
export const IS_PROD = env.NODE_ENV === 'production'

export const HAS_SENTRY = !!env.SENTRY_DSN

export const APP_NAME = env.APP_NAME
