import { asyncLocalStorage } from '@lib/async-local-storage'

export function getUserIdStored() {
  // WARNING: Não emitir exceção de async local storage não inicializado
  // aqui, pois o pino não consegue inicializar caso contrário

  const store = asyncLocalStorage.getStore()

  return store?.userId
}
