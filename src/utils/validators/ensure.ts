import type { IEnsure } from '@custom-types/utils/guards/ensure'

/**
 * Garante que um valor exista (não seja `null` nem `undefined`), lançando o erro fornecido caso contrário.
 *
 * Utilizado para simplificar validações de existência em Use Cases,
 * evitando repetição de `if (!value) throw new Error()`.
 *
 * @typeParam S - Tipo do valor esperado.
 * @param params - Parâmetros de validação.
 * @param params.value - Valor a verificar.
 * @param params.error - Erro a ser lançado se o valor for nulo.
 * @returns O próprio valor, com tipo narrowed para `S` (sem null/undefined).
 * @throws O erro fornecido se `value` for `null` ou `undefined`.
 *
 * @example
 * const user = ensureExists({ value: maybeUser, error: new ResourceNotFoundError('Usuário') })
 * // user agora é garantidamente não-nulo
 */
export function ensureExists<S>({ value, error }: IEnsure<S>) {
  if (value !== null && value !== undefined) return value
  throw error
}

/**
 * Garante que um valor **não** exista (seja `null` ou `undefined`), lançando o erro fornecido caso contrário.
 *
 * Utilizado para validações de unicidade, onde a existência de um registro indica conflito.
 *
 * @typeParam S - Tipo do valor.
 * @param params - Parâmetros de validação.
 * @param params.value - Valor a verificar.
 * @param params.error - Erro a ser lançado se o valor existir.
 * @returns O próprio valor (`null` ou `undefined`).
 * @throws O erro fornecido se `value` não for nulo.
 *
 * @example
 * ensureNotExists({ value: existingEmail, error: new ResourceAlreadyExistsError('Email') })
 */
export function ensureNotExists<S>({ value, error }: IEnsure<S>) {
  if (value === null || value === undefined) return value
  throw error
}
