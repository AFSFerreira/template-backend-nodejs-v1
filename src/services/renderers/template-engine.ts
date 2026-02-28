import type { Environment } from 'nunjucks'
import { NUNJUCKS_TEMPLATES_ROOT_PATH } from '@constants/dynamic-file-constants'
import { IS_DEV } from '@constants/env-constants'
import nunjucks from 'nunjucks'

export class TemplateEngine {
  private static instance: Environment | undefined

  private constructor() {}

  public static getInstance(): Environment {
    if (!TemplateEngine.instance) {
      TemplateEngine.instance = nunjucks.configure(NUNJUCKS_TEMPLATES_ROOT_PATH, {
        autoescape: true,
        noCache: IS_DEV,
        throwOnUndefined: true,
        trimBlocks: true,
        lstripBlocks: true,
      })
    }

    return TemplateEngine.instance
  }
}
