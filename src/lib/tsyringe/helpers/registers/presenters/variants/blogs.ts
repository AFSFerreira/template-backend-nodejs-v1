import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { BlogDefaultPresenter } from '@presenters/variants/blog/blog-default.presenter'
import { BlogDetailedPresenter } from '@presenters/variants/blog/blog-detailed.presenter'
import { BlogDetailedForAdminPresenter } from '@presenters/variants/blog/blog-detailed-for-admin.presenter'
import { BlogDetailedWithContentPresenter } from '@presenters/variants/blog/blog-detailed-with-content.presenter'
import { BlogSimplifiedPresenter } from '@presenters/variants/blog/blog-simplified.presenter'

export function registerBlogPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.blog.blogDefault,
    container,
    target: BlogDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.blog.blogSimplified,
    container,
    target: BlogSimplifiedPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.blog.blogDetailed,
    container,
    target: BlogDetailedPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.blog.blogDetailedForAdmin,
    container,
    target: BlogDetailedForAdminPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.blog.blogDetailedWithContent,
    container,
    target: BlogDetailedWithContentPresenter,
  })
}
