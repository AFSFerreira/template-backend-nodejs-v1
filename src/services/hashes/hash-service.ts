import type { IComparePassword } from '@custom-types/services/hashes/compare-password'
import type { HashedPassword } from '@custom-types/services/hashes/hashed-password'
import type { HashedToken } from '@custom-types/services/hashes/hashed-token'
import type { JobHash } from '@custom-types/services/hashes/job-hash'
import type { Token } from '@custom-types/services/hashes/token'
import type { UuidHash } from '@custom-types/services/hashes/uuid-hash'
import type { Options as ArgonOptions } from 'argon2'
import crypto from 'node:crypto'
import { env } from '@env/index'
import { argon2id, hash as argonHash, needsRehash, verify } from 'argon2'
import { singleton } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

/**
 * Serviço centralizado de hashing e geração de identificadores.
 *
 * Combina Argon2id (com pepper secreto) para senhas, SHA-256 para tokens,
 * HMAC-SHA256 para blind indexes de documentos, e UUID v4 para identificadores únicos.
 */
@singleton()
export class HashService {
  private static readonly argonConfig = {
    type: argon2id,
    memoryCost: env.ARGON_MEMORY_COST,
    timeCost: env.ARGON_TIME_COST,
    parallelism: env.ARGON_PARALLELISM,
    secret: Buffer.from(env.ARGON_SECRET),
  } satisfies ArgonOptions

  private static cachedDummyHash: string | null = null

  /**
   * Gera hash SHA-256 de um token ou string qualquer.
   *
   * @param input - Valor a ser hasheado.
   * @returns Hash SHA-256 em formato hexadecimal.
   */
  hashToken(input: string): HashedToken {
    return crypto.hash('sha256', input) as HashedToken
  }

  /**
   * Gera hash Argon2id de uma senha com pepper secreto.
   *
   * @param password - Senha em texto plano.
   * @returns Hash Argon2id da senha.
   */
  async hashPassword(password: string): Promise<HashedPassword> {
    const hash = await argonHash(password, HashService.argonConfig)
    return hash as HashedPassword
  }

  /**
   * Compara uma senha em texto plano com um hash Argon2id.
   *
   * @returns `true` se a senha corresponde ao hash.
   */
  async comparePassword({ password, hashedPassword }: IComparePassword): Promise<boolean> {
    return await verify(hashedPassword, password, { secret: HashService.argonConfig.secret })
  }

  /**
   * Gera um token criptograficamente seguro usando `crypto.randomBytes`.
   *
   * @param bytesNumber - Quantidade de bytes aleatórios (a string resultante terá o dobro em caracteres hex).
   * @returns Token hexadecimal.
   */
  generateToken(bytesNumber: number): Token {
    return crypto.randomBytes(bytesNumber).toString('hex') as Token
  }

  generateJobId(): JobHash {
    return uuidv4() as JobHash
  }

  generateUuid(): UuidHash {
    return uuidv4() as UuidHash
  }

  /**
   * Verifica se um hash Argon2 existente precisa ser recalculado
   * por estar com parâmetros de custo desatualizados.
   */
  needsUpgrade(hash: string): boolean {
    return needsRehash(hash, HashService.argonConfig)
  }

  /**
   * Retorna um hash Argon2 dummy (cache interno) para prevenir timing attacks.
   *
   * Usado quando o usuário não é encontrado durante autenticação, garantindo
   * que o tempo de resposta seja consistente independentemente da existência do usuário.
   */
  async getDummyHash(): Promise<string> {
    if (!HashService.cachedDummyHash) {
      HashService.cachedDummyHash = await argonHash('dummy_password_for_timing_attacks', HashService.argonConfig)
    }

    return HashService.cachedDummyHash
  }
}
