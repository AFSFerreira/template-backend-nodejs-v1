export function registerSignals(signals: string[], callback: (...args: unknown[]) => void) {
  for (const signal of signals) {
    process.on(signal, callback)
  }
}
