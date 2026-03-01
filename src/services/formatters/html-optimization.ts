import type { Options } from 'html-minifier-terser'
import { logError } from '@lib/pino/helpers/log-error'
import { EMAIL_MINIFY_ERROR, WEB_MINIFY_ERROR } from '@messages/loggings/services/html-optimization'
import { minify } from 'html-minifier-terser'

const emailMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  keepClosingSlash: true,
  removeEmptyAttributes: true,
  ignoreCustomComments: [/^!/],
} as const satisfies Options

const webMinifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
} as const satisfies Options

export class HtmlOptimizationService {
  private static cleanDomArtifacts(html: string): string {
    return html.replaceAll('xmlns="http://www.w3.org/1999/xhtml"', '')
  }

  static async minifyForEmail(html: string): Promise<string> {
    try {
      const cleanedHtml = HtmlOptimizationService.cleanDomArtifacts(html)
      return await minify(cleanedHtml, emailMinifyOptions)
    } catch (error) {
      logError({ error: error, message: EMAIL_MINIFY_ERROR })
      return html
    }
  }

  static async minifyForWeb(html: string): Promise<string> {
    try {
      const cleanedHtml = HtmlOptimizationService.cleanDomArtifacts(html)
      return await minify(cleanedHtml, webMinifyOptions)
    } catch (error) {
      logError({ error: error, message: WEB_MINIFY_ERROR })
      return html
    }
  }
}
