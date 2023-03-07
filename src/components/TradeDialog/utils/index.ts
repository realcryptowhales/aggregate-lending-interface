import { utils, BigNumber } from 'ethers';
import BN from 'bignumber.js';
import { FormatCurrencyNumberProps, ParseUnitsProps } from '@/constant/type';

export const toPercent = (num?: string) => {
  return num ? `${BN(num).times(100)}%` : '0%';
};

export const cutZero = (old: string) => {
  //拷贝一份 返回去掉零的新串
  let newStr = old;
  //循环变量 小数部分长度
  const leng = old.length - old.indexOf('.') - 1;
  //判断是否有效数
  if (old.indexOf('.') > -1) {
    //循环小数部分
    for (let i = leng; i > 0; i--) {
      //如果newstr末尾有0
      if (
        newStr.lastIndexOf('0') > -1 &&
        newStr.substr(newStr.length - 1, 1) === '0'
      ) {
        const k = newStr.lastIndexOf('0');
        //如果小数点后只有一个0 去掉小数点
        if (newStr.charAt(k - 1) == '.') {
          return newStr.substring(0, k - 1);
        } else {
          //否则 去掉一个0
          newStr = newStr.substring(0, k);
        }
      } else {
        //如果末尾没有0
        return newStr;
      }
    }
  }
  return old;
};

// bigNumber to percent
export const formatRatePercent = (big: BigNumber) => {
  return toPercent(BN(utils.formatUnits(big, 6)).toFixed(4, 1));
};

export const formatRateNumber = (big: BigNumber) => {
  return cutZero(BN(utils.formatUnits(big, 6)).toFixed(4, 1));
};

export const formatPriceNumber = (big: BigNumber) => {
  return cutZero(utils.formatUnits(big, 8));
};

// bigNumber to number
export const formatCurrencyNumber = ({
  big,
  decimal
}: FormatCurrencyNumberProps) => {
  return big && decimal
    ? cutZero(BN(utils.formatUnits(big, decimal)).toFixed(4, 1))
    : '0';
};

export const parseUnits = ({ num, decimal }: ParseUnitsProps) => {
  return num && decimal ? utils.parseUnits(num, decimal) : '0';
};
