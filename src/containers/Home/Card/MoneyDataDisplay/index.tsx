import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
interface Props {
  totalMarket: string;
  matchTotalAmount: string;
  totalDepositAmount: string;
  totalLoanAmount: string;
}
const MoneyDataDisplay: React.FC<Props> = ({
  totalMarket,
  matchTotalAmount,
  totalDepositAmount,
  totalLoanAmount
}) => {
  return (
    <div className={cls(style.container)}>
      <div>
        <div className={cls(style['container-title'])}>市场总规模</div>
        <div>{totalMarket}</div>
      </div>
      <div>
        <div className={cls(style['container-title'])}>内部撮合总金额</div>
        <div>{matchTotalAmount}</div>
      </div>
      <div>
        <div className={cls(style['container-title'])}>平台总存款金额</div>
        <div>{totalDepositAmount}</div>
      </div>
      <div>
        <div className={cls(style['container-title'])}>平台总借款金额</div>
        <div>{totalLoanAmount}</div>
      </div>
    </div>
  );
};

export default MoneyDataDisplay;
