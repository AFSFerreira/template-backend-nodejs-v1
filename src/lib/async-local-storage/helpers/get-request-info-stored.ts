import { asyncLocalStorage } from '@lib/async-local-storage'
import { AsyncLocalStorageNotInitializedError } from '@services/errors/async-local-storage/async-local-storage-not-initialized-error'

export function getRequestInfoStored() {
  const store = asyncLocalStorage.getStore()

  if (!store) {
    throw new AsyncLocalStorageNotInitializedError()
  }

  return store.requestInfo
}
