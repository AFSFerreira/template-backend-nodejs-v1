export function registerSignals(signals: string[], callback: (...args: any[]) => void) {
  for (const signal of signals) {
    process.on(signal, callback)
  }
}
