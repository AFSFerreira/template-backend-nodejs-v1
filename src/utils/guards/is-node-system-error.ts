import type { NodeSystemError } from '@custom-types/custom/node-system-error'

/**
 * Type guard que verifica se um erro desconhecido é um erro de sistema do Node.js.
 *
 * Erros de sistema do Node possuem a propriedade `code` (ex: `ENOENT`, `EACCES`, `ECONNREFUSED`),
 * permitindo tratamento específico de falhas de I/O e sistema.
 *
 * @param error - Valor desconhecido a ser verificado.
 * @returns `true` se for uma instância de `Error` com a propriedade `code`.
 *
 * @example
 * try { fs.readFileSync('/inexistente') }
 * catch (err) { isNodeSystemError(err) } // true, err.code === 'ENOENT'
 */
export function isNodeSystemError(error: unknown): error is NodeSystemError {
  return error instanceof Error && 'code' in error
}
