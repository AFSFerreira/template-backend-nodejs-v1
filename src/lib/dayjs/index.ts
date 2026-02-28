import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.locale('pt-br')
dayjs.extend(advancedFormat)
