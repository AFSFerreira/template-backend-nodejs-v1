import type { Environment } from 'nunjucks'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { IS_DEV } from '@constants/env-constants'
import nunjucks from 'nunjucks'

/**
 * Motor de templates Nunjucks com padrão Singleton.
 *
 * Gerencia duas instâncias independentes:
 * - **HTML** (`autoescape: true`): previne XSS escapando variáveis automaticamente.
 * - **Texto** (`autoescape: false`): renderiza templates de texto plano sem escaping.
 *
 * Em ambiente de desenvolvimento, habilita hot-reload e desativa cache de templates.
 */
export class TemplateEngine {
  private static htmlInstance: Environment | undefined
  private static textInstance: Environment | undefined
  private static loader: nunjucks.FileSystemLoader | undefined

  private constructor() {}

  private static getLoader(): nunjucks.FileSystemLoader {
    if (!TemplateEngine.loader) {
      TemplateEngine.loader = new nunjucks.FileSystemLoader(NUNJUCKS_TEMPLATES_ROOT_PATH, {
        watch: IS_DEV,
        noCache: IS_DEV,
      })
    }
    return TemplateEngine.loader
  }

  public static getHtmlInstance(): Environment {
    if (!TemplateEngine.htmlInstance) {
      TemplateEngine.htmlInstance = new nunjucks.Environment(TemplateEngine.getLoader(), {
        autoescape: true,
        throwOnUndefined: true,
        trimBlocks: true,
        lstripBlocks: true,
      })
    }
    return TemplateEngine.htmlInstance
  }

  public static getTextInstance(): Environment {
    if (!TemplateEngine.textInstance) {
      TemplateEngine.textInstance = new nunjucks.Environment(TemplateEngine.getLoader(), {
        autoescape: false,
        throwOnUndefined: true,
        trimBlocks: true,
        lstripBlocks: true,
      })
    }
    return TemplateEngine.textInstance
  }
}
