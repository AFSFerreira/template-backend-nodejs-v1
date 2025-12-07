import { AsyncLocalStorage } from 'node:async_hooks'
import type { IAsyncContext } from '@custom-types/libs/async-local-storage/async-local-storage'

export const asyncLocalStorage = new AsyncLocalStorage<IAsyncContext>()
