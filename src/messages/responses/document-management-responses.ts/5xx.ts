import type { IApiResponse } from '@custom-types/responses/api-response'

export const ELECTION_NOTICE_FILE_READ_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'ELECTION_NOTICE_FILE_READ_ERROR',
    message: 'Ocorreu um erro ao tentar ler o arquivo de edital de eleição',
  },
}

export const STATUTE_FILE_READ_ERROR: IApiResponse = {
  status: 500,
  body: {
    code: 'STATUTE_FILE_READ_ERROR',
    message: 'Ocorreu um erro ao tentar ler o arquivo de estatuto',
  },
}
