import banks from 'bancos-brasileiros'
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const bankCodeSchema = limitedNonemptyTextSchema.refine((data) => banks.find((bank) => bank.COMPE === data))
