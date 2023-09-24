import moment from 'moment';

export function dateFormat(date: Date | string) {
  return date ? moment(date).locale('ru').format('DD/MM/YYYY HH:mm') : '';
}
