import { BigNumber, BigNumberish, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import moment from 'moment';
import numbro from 'numbro';

export const thousandNumber = (number: number | string, mantissa = 6) => {
  return numbro(number).format({
    thousandSeparated: true,
    mantissa,
    roundingFunction: Math.floor
  });
};
export const thousandCurrency = (number: number | string, mantissa = 6) => {
  return numbro(number).formatCurrency({
    thousandSeparated: true,
    mantissa,
    roundingFunction: Math.floor
  });
};
export const formatPercent = (number: number | string, mantissa = 4) => {
  return numbro(number).format({
    output: 'percent',
    thousandSeparated: true,
    mantissa,
    roundingFunction: Math.floor
  });
};

export const formatDate = (timestamp: number) => {
  return moment(timestamp).format('YYYY-MM-DD hh:mm:ss');
};
export const formatContractData = (data: any[]) => {
  const keys = Object.keys(data);
  const obj: any = {};
  keys.forEach((key: string) => {
    //排除数组索引
    if (Number.isNaN(+key)) {
      obj[key] = data[key as any];

      // if (typeof data[key as any] === 'object') {
      //   obj[key] = data[key as any].toString();
      // } else {
      //   obj[key] = data[key as any];
      // }
    }
  });
  return obj;
};
export const rawToThousandCurrency = (
  raw: BigNumber,
  unit = 6,
  mantissa = 4
) => {
  if (!(raw instanceof BigNumber)) return '--';
  return thousandCurrency(formatUnits(raw, unit), mantissa);
};
export const rawToThousandNumber = (raw: BigNumber, unit = 6, mantissa = 4) => {
  if (!(raw instanceof BigNumber)) return '--';

  return thousandNumber(formatUnits(raw, unit), mantissa);
};
export const rawToPercent = (raw: BigNumber, unit = 6, mantissa = 4) => {
  if (!(raw instanceof BigNumber)) return '--';
  return formatPercent(formatUnits(raw, unit), mantissa);
};
