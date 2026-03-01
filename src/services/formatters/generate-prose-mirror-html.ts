import type { Extensions, JSONContent } from '@tiptap/core'
import { HtmlOptimizationService } from '@services/formatters/html-optimization'
import { generateHTML } from '@tiptap/html'

export async function generateProseMirrorHtmlWeb(content: JSONContent, extensions: Extensions): Promise<string> {
  const html = generateHTML(content, extensions)

  return HtmlOptimizationService.minifyForWeb(html)
}

export async function generateProseMirrorHtmlEmail(content: JSONContent, extensions: Extensions): Promise<string> {
  const html = generateHTML(content, extensions)

  return HtmlOptimizationService.minifyForEmail(html)
}
