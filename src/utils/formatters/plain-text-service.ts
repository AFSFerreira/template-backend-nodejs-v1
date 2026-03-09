import { compile } from 'html-to-text'

/**
 * Serviço estático para conversão de HTML em texto plano.
 *
 * Remove todas as tags HTML preservando a estrutura textual, com quebra de linha automática
 * a cada 130 caracteres. Imagens são ignoradas e links duplicados são suprimidos.
 *
 * Utilizado para gerar versões plain-text de emails (multipart) e para indexação
 * de conteúdo de blogs/newsletters.
 */
export class PlainTextService {
  private static converter = compile({
    wordwrap: 130,
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } },
    ],
  })

  /**
   * Converte uma string HTML em texto plano.
   *
   * @param html - Conteúdo HTML a ser convertido.
   * @returns Texto plano sem tags HTML, ou string vazia se o input for falsy.
   *
   * @example
   * PlainTextService.fromHtml('<p>Olá <strong>mundo</strong>!</p>') // 'Olá mundo!'
   * PlainTextService.fromHtml('')                                     // ''
   */
  public static fromHtml(html: string): string {
    if (!html) return ''

    return PlainTextService.converter(html)
  }
}
