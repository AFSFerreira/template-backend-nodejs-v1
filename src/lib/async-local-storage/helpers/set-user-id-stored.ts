import { asyncLocalStorage } from '@lib/async-local-storage'
import { AsyncLocalStorageNotInitializedError } from '@utils/errors/async-local-storage/async-local-storage-not-initialized-error'

export function setUserIdStored(userId: string) {
  const store = asyncLocalStorage.getStore()

  if (!store) {
    throw new AsyncLocalStorageNotInitializedError()
  }

  store.userId = userId

  return
}
