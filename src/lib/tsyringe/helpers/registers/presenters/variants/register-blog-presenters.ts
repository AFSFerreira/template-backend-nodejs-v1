import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { BlogDefaultPresenter } from '@presenters/blog/blog-default.presenter'
import { BlogDetailedPresenter } from '@presenters/blog/blog-detailed.presenter'
import { BlogDetailedForAdminPresenter } from '@presenters/blog/blog-detailed-for-admin.presenter'
import { BlogDetailedWithContentPresenter } from '@presenters/blog/blog-detailed-with-content.presenter'
import { BlogSimplifiedPresenter } from '@presenters/blog/blog-simplified.presenter'

export function registerBlogPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.blog.blogDefault,
    container,
    target: BlogDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.blog.blogSimplified,
    container,
    target: BlogSimplifiedPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.blog.blogDetailed,
    container,
    target: BlogDetailedPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.blog.blogDetailedForAdmin,
    container,
    target: BlogDetailedForAdminPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.blog.blogDetailedWithContent,
    container,
    target: BlogDetailedWithContentPresenter,
  })
}
