import { BigNumberish, ethers } from 'ethers';
import moment from 'moment';
import numbro from 'numbro';

export const thousandNumber = (number: number, mantissa = 1) => {
  return numbro(number).format({ thousandSeparated: true, mantissa });
};
export const thousandCurrency = (number: number, mantissa = 1) => {
  return numbro(number).formatCurrency({ thousandSeparated: true, mantissa });
};
export const formatPercent = (number: number, mantissa = 1) => {
  return numbro(number).format({
    output: 'percent',
    thousandSeparated: true,
    mantissa
  });
};

export const formatDate = (timestamp: number) => {
  return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
};
