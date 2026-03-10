import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'

export const DirectorPositionDefaultPresenter = {
  toHTTP(input: DirectorPositionDefaultPresenterInput): HTTPDirectorPosition {
    return {
      id: input.publicId,
      position: input.position,
      description: input.description,
      precedence: input.precedence,
    }
  },

  toHTTPList(inputs: DirectorPositionDefaultPresenterInput[]): HTTPDirectorPosition[] {
    return inputs.map(this.toHTTP)
  },
}
