import dayjs from 'dayjs'
import 'dayjs/locale/pt-br.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.locale('pt-br')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
