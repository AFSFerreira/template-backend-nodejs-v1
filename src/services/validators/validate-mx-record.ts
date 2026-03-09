import { resolve4, resolve6, resolveMx } from 'node:dns/promises'
import { redis } from '@lib/redis'
import { getMxRecordCached, setMxRecordCached } from '@services/caches/validate-mx-record-cache'
import { isNodeSystemError } from '@utils/guards/is-node-system-error'

/**
 * Verifica se um domínio possui registros A (IPv4) ou AAAA (IPv6) como fallback
 * quando registros MX não são encontrados.
 *
 * Consulta ambos os tipos de registro em paralelo via `Promise.allSettled`,
 * tolerando falhas individuais sem propagar exceções.
 *
 * @param domain - Domínio a ser verificado.
 * @returns `true` se ao menos um registro A ou AAAA for encontrado.
 */
async function checkFallbackRecord(domain: string): Promise<boolean> {
  const [aRecordsResult, aaaaRecordsResult] = await Promise.allSettled([resolve4(domain), resolve6(domain)])

  const hasA = aRecordsResult.status === 'fulfilled' && aRecordsResult.value.length > 0

  const hasAAAA = aaaaRecordsResult.status === 'fulfilled' && aaaaRecordsResult.value.length > 0

  return hasA || hasAAAA
}

/**
 * Valida se o domínio de um e-mail possui registros MX válidos para receber mensagens.
 *
 * Estratégia de verificação em cascata:
 * 1. Consulta cache Redis para evitar lookups DNS repetidos.
 * 2. Resolve registros MX via DNS.
 * 3. Em caso de `ENODATA`, faz fallback para registro A (IPv4) ou registro AAAA (IPv6).
 * 4. Para erros transientes (timeout, SERVFAIL), retorna `true` (fail-open).
 *
 * Os resultados são persistidos no Redis como `'valid'` ou `'invalid'`.
 *
 * @param email - Endereço de e-mail completo.
 * @returns `true` se o domínio puder receber e-mails.
 */
export async function hasValidMxRecord(email: string) {
  const domain = email.split('@')[1]

  const mxRecordCached = await getMxRecordCached({
    mxRecord: domain,
    redis,
  })

  if (mxRecordCached) return mxRecordCached === 'valid'

  try {
    const mxRecords = await resolveMx(domain)

    if (mxRecords && mxRecords.length > 0) {
      await setMxRecordCached({
        mxRecord: domain,
        result: 'valid',
        redis,
      })

      return true
    }
  } catch (error: unknown) {
    if (isNodeSystemError(error)) {
      if (error.code === 'ENOTFOUND' || error.code === 'NXDOMAIN') {
        await setMxRecordCached({
          mxRecord: domain,
          result: 'invalid',
          redis,
        })
        return false
      }

      if (error.code === 'ENODATA') {
        const domainRecordFbResult = (await checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

        await setMxRecordCached({
          mxRecord: domain,
          result: domainRecordFbResult,
          redis,
        })
        return domainRecordFbResult === 'valid'
      }
    }

    // Timeout, SERVFAIL, etc
    return true
  }

  const domainRecordFbResult = (await checkFallbackRecord(domain)) === true ? 'valid' : 'invalid'

  await setMxRecordCached({
    mxRecord: domain,
    result: domainRecordFbResult,
    redis,
  })

  return domainRecordFbResult === 'valid'
}
