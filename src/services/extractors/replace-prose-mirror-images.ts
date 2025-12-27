import type { IReplaceProseMirrorImages } from '@custom-types/services/replace-prose-mirror-images'
import type { JSONContent } from '@tiptap/core'

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
