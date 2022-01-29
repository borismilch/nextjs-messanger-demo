import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Calendar from 'dayjs/plugin/calendar'

dayjs.extend(Calendar)

export const dayts: any = dayjs.extend(RelativeTime)

export const calendarConfig = {
  sameDay: '[Сьогодні о] h:mm A',
  nextDay: '[Завтра]',
  nextWeek: 'dddd', 
  lastDay: '[Вчора]', 
  lastWeek: '[Цього тижня] dddd', 
  sameElse: 'DD/MM/YYYY'
}