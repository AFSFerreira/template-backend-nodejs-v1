import 'reflect-metadata'
import { container } from 'tsyringe'
import { registerInfraServices } from './helpers/registers/infra/register-infra'
import { registerRepositories } from './helpers/registers/repositories/register-repositories'

registerRepositories(container)
registerInfraServices(container)
