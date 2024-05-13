import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';

import 'dayjs/locale/pt-br';
dayjs.locale('pt-br')
dayjs.extend(isLeapYear) 
dayjs.extend(isoWeek)

export const localizedDayJs = dayjs

export const convertToDayjs = (date: Date | undefined | null) => {
  if (!date) {
    return undefined
  }

  return localizedDayJs(date)
}

export const dateToString = (date: Date | undefined | null) => {
  if (!date) {
    return undefined
  }

  return localizedDayJs(date).format('HH:mm DD/MMMM/YYYY')
}