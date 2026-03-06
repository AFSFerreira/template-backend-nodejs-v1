import z from 'zod'

// HACK: Validar uma estrutura recursiva de prose mirror
// com inúmeros plugins é extremamente complexo, então
// é melhor tipar com any para evitar problemas eventualmente.
// Uma alternativa é tentar compilar o prose mirror para validá-lo!
export const proseMirrorSchema = z
  .object({
    type: z.literal('doc'),
    content: z.array(z.any()).optional(),
  })
  .loose()
