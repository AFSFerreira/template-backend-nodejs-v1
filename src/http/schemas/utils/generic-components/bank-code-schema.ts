import banks from 'bancos-brasileiros/bancos.json' with { type: 'json' }
import { limitedNonemptyTextSchema } from '../primitives/limited-nonempty-text-schema'

export const bankCodeSchema = limitedNonemptyTextSchema.refine((data) => banks.find((bank) => bank.COMPE === data))
