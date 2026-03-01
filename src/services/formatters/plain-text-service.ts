import { compile } from 'html-to-text'

export class PlainTextService {
  private static converter = compile({
    wordwrap: 130,
    selectors: [
      { selector: 'img', format: 'skip' }, // Ignora imagens completamente no texto
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } }, // Evita duplicar links se o texto já for a URL
    ],
  })

  public static fromHtml(html: string): string {
    if (!html) return ''

    return PlainTextService.converter(html)
  }
}
