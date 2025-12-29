import type { IApiError } from '@custom-types/custom/api-error-type'

export const BLOG_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'BLOG_NOT_FOUND',
    message: 'O blog solicitado não foi encontrado',
  },
}

export const BLOG_DELETION_FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'BLOG_DELETION_FORBIDDEN',
    message: 'Você não tem permissão para deletar este blog',
  },
}

export const BLOG_ACCESS_FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'BLOG_ACCESS_FORBIDDEN',
    message: 'Você não tem permissão para acessar este conteúdo',
  },
}

export const BLOG_COPY_FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'BLOG_COPY_FORBIDDEN',
    message: 'Você não tem permissão para copiar este blog',
  },
}

export const BLOG_EDITORIAL_STATUS_CHANGE_FORBIDDEN: IApiError = {
  status: 403,
  body: {
    code: 'BLOG_EDITORIAL_STATUS_CHANGE_FORBIDDEN',
    message: 'Você não tem permissão para alterar o status editorial deste blog',
  },
}

export const BLOG_IMAGE_COPY_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_COPY_FAILED',
    message: 'Falha ao copiar uma das imagens do blog',
  },
}

export const BLOG_CONTENT_COPY_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_CONTENT_COPY_FAILED',
    message: 'Falha ao copiar o conteúdo do blog',
  },
}

export const BLOG_NOT_IN_DRAFT_STATUS: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_NOT_IN_DRAFT_STATUS',
    message: 'Este blog não está em estado de rascunho',
  },
}

export const BLOG_NOT_IN_PENDING_APPROVAL_STATUS: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_NOT_IN_PENDING_APPROVAL_STATUS',
    message: 'Este blog não está aguardando aprovação',
  },
}

export const BLOG_NOT_IN_PUBLISHED_STATUS: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_NOT_IN_PUBLISHED_STATUS',
    message: 'Este blog não está publicado',
  },
}

export const BLOG_NOT_IN_CHANGES_REQUESTED_STATUS: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_NOT_IN_CHANGES_REQUESTED_STATUS',
    message: 'Este blog não está no estado de alterações aguardadas',
  },
}

export const INVALID_BLOG_CONTENT: IApiError = {
  status: 400,
  body: {
    code: 'INVALID_BLOG_CONTENT',
    message: 'O conteúdo do blog é inválido',
  },
}

export const BLOG_BANNER_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_BANNER_PERSIST_FAILED',
    message: 'Falha ao persistir o banner do blog',
  },
}

export const BLOG_BANNER_REQUIRED_FOR_NON_DRAFT: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_BANNER_REQUIRED_FOR_NON_DRAFT',
    message: 'Blogs fora do estado de rascunho devem possuir banner',
  },
}

export const BLOG_IMAGE_PERSIST_FAILED: IApiError = {
  status: 500,
  body: {
    code: 'BLOG_IMAGE_PERSIST_FAILED',
    message: 'Falha ao persistir uma ou mais imagens do blog',
  },
}

export const BLOG_IMAGE_NOT_FOUND: IApiError = {
  status: 404,
  body: {
    code: 'BLOG_IMAGE_NOT_FOUND',
    message: 'Uma das imagens do blog não foi encontrada',
  },
}

export const BLOG_INVALID_IMAGE_LINK: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_INVALID_IMAGE_LINK',
    message: 'Um ou mais links de imagem do blog são inválidos',
  },
}

export const BLOG_INVALID_IMAGE_LINK_ON_COPY: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_INVALID_IMAGE_LINK_ON_COPY',
    message: 'Um ou mais links de imagem no conteúdo do blog a ser copiado são inválidos',
  },
}

export const BLOG_INVALID_BANNER_LINK: IApiError = {
  status: 400,
  body: {
    code: 'BLOG_INVALID_BANNER_LINK',
    message: 'O link do banner do blog é inválido',
  },
}
