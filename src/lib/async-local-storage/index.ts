import type { IAsyncContext } from '@custom-types/libs/async-local-storage/async-local-storage'
import { AsyncLocalStorage } from 'node:async_hooks'

export const asyncLocalStorage = new AsyncLocalStorage<IAsyncContext>()
