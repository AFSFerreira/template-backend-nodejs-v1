import 'reflect-metadata'
import { container } from 'tsyringe'
import { registerInfraServices } from './helpers/registers/infra/register-infra'
import { registerPresenterServices } from './helpers/registers/presenters/register-presenters'
import { registerRepositories } from './helpers/registers/repositories/register-repositories'

registerRepositories(container)
registerPresenterServices(container)
registerInfraServices(container)
