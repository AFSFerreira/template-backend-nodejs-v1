import type { IReplaceProseMirrorImages } from '@custom-types/services/extractors/replace-prose-mirror-images'
import type { JSONContent } from '@tiptap/core'

/**
 * Substitui URLs de imagens dentro de um documento ProseMirror.
 *
 * Percorre recursivamente toda a árvore de nós do documento ProseMirror e, para cada nó
 * do tipo `image`, verifica se a URL de origem (`src`) possui uma correspondência no mapa
 * de substituição. Se houver, atualiza o `src` para a nova URL.
 *
 * Caso de uso típico: ao mover imagens de diretório temporário para permanente,
 * as URLs antigas dentro do ProseMirror precisam ser atualizadas para apontar
 * para os novos caminhos.
 *
 * @param params - Parâmetros para substituição.
 * @param params.proseMirror - Documento ProseMirror no formato JSON.
 * @param params.oldToNewImagesMap - Mapa de URLs antigas para novas (chave: URL antiga, valor: URL nova).
 * @returns Novo documento ProseMirror com as URLs de imagem substituídas (imutável).
 *
 * @example
 * const mapa = new Map([['https://temp/img.avif', 'https://final/img.avif']])
 * replaceProseMirrorImages({ proseMirror: doc, oldToNewImagesMap: mapa })
 */
export function replaceProseMirrorImages({ proseMirror, oldToNewImagesMap }: IReplaceProseMirrorImages): JSONContent {
  function traverseNode(node: JSONContent): JSONContent {
    // Se o nó é uma imagem, verifica se precisa ser substituído
    if (node.type === 'image' && node.attrs?.src) {
      const oldSrc = node.attrs.src as string
      const newSrc = oldToNewImagesMap.get(oldSrc)

      if (newSrc) {
        return {
          ...node,
          attrs: {
            ...node.attrs,
            src: newSrc,
          },
        }
      }
    }

    // Recursivamente processa o conteúdo do nó
    if (node.content && Array.isArray(node.content)) {
      return {
        ...node,
        content: node.content.map(traverseNode),
      }
    }

    return node
  }

  return traverseNode(proseMirror)
}
