import { SystemError } from '@errors/system-error'
import { ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR } from '@messages/system/async-local-storage'

export class AsyncLocalStorageNotInitializedError extends SystemError {
  constructor() {
    super(ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR)
  }
}
