/**
 * Registra um callback para múltiplos sinais do processo.
 *
 * @param signals - Lista de nomes de sinais (e.g., `['SIGINT', 'SIGTERM']`).
 * @param callback - Função executada quando qualquer sinal é recebido.
 */
export function registerSignals(signals: string[], callback: (...args: unknown[]) => void) {
  for (const signal of signals) {
    process.on(signal, callback)
  }
}
