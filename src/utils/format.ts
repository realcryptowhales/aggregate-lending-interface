import moment from 'moment';
import numbro from 'numbro';

export const thousandNumber = (number: number, mantissa = 1) => {
  return numbro(number).format({ thousandSeparated: true, mantissa });
};
export const formatDate = (timestamp: number) => {
  return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
};
