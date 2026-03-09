import type { JSONContent } from '@tiptap/core'
import { getBackendBaseUrlStored } from '@lib/async-local-storage/helpers/get-backend-base-url-stored'

/**
 * Extrai URLs de imagens hospedadas no próprio backend a partir de um documento ProseMirror.
 *
 * Percorre recursivamente a árvore de nós buscando nós do tipo `image`
 * cujo `src` começa com a URL base do backend. Retorna um `Set` para deduplicar.
 *
 * @param proseMirror - Documento ProseMirror no formato `JSONContent`.
 * @returns Conjunto de URLs de imagens hospedadas internamente.
 */
export function extractProseMirrorImages(proseMirror: JSONContent) {
  const images = new Set<string>()
  const backendBaseUrl = getBackendBaseUrlStored()

  function traverseNode(node: JSONContent) {
    if (node.type === 'image' && node.attrs?.src && (node.attrs.src as string).startsWith(backendBaseUrl)) {
      images.add(node.attrs.src)
    }

    if (node.content && Array.isArray(node.content)) {
      for (const child of node.content) {
        traverseNode(child)
      }
    }
  }

  traverseNode(proseMirror)

  return images
}
