import sanitizeHtml from 'sanitize-html'

export class HtmlSanitizationService {
  /**
   * Sanitização para Web: Permite iframes de fontes confiáveis (ex: YouTube),
   * tabelas, imagens e formatações ricas geradas pelo TipTap, mas bloqueia scripts.
   */
  static sanitizeForWeb(dirtyHtml: string): string {
    return sanitizeHtml(dirtyHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe', 'h1', 'h2', 'u']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height'],
        iframe: ['src', 'width', 'height', 'allowfullscreen'],
      },
      allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
    })
  }

  /**
   * Sanitização para E-mail: Extremamente restritiva.
   * Remove iframes, formulários, vídeos e scripts. Mantém apenas o básico
   * para garantir que o layout não quebre em clientes de e-mail antigos.
   */
  static sanitizeForEmail(dirtyHtml: string): string {
    return sanitizeHtml(dirtyHtml, {
      allowedTags: [
        'b',
        'i',
        'em',
        'strong',
        'a',
        'p',
        'br',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'img',
        'table',
        'tr',
        'td',
        'tbody',
        'thead',
        'th',
      ],
      allowedAttributes: {
        a: ['href', 'target'],
        img: ['src', 'alt', 'width', 'height'],
        '*': ['style'],
      },
      allowedIframeHostnames: [],
      transformTags: {
        a: sanitizeHtml.simpleTransform('a', { target: '_blank' }),
      },
    })
  }
}
