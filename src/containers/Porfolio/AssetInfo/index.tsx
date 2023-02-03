import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
// interface Props {
// title: React.ReactNode;
// secondTitle?: string;
// children: React.ReactNode;
// }
const InfoItem: React.FC<{
  title: string;
  amount: number;
  percentText: string;
  percent: number;
}> = ({ title, amount, percentText, percent }) => {
  return (
    <div style={{ marginRight: 59 }}>
      <div className={style.title}>{title}</div>
      <div className={style.amount}>{amount}</div>
      {percentText && (
        <div className={style.percent}>
          <span className={style.percentText}>{percentText}</span>
          <span className={style.percentNumber}>{percent}</span>
        </div>
      )}
    </div>
  );
};
// eslint-disable-next-line no-empty-pattern
const AssetInfo: React.FC = ({}) => {
  return (
    <div className={cls(style.container)}>
      <InfoItem
        title={'总存款金额'}
        amount={0}
        percentText={'总存款'}
        percent={0}
      />
      <InfoItem
        title={'总借款金额'}
        amount={0}
        percentText={'总借款'}
        percent={0}
      />
      <InfoItem
        title={'今日预估总收益'}
        amount={0}
        percentText={'净收益率'}
        percent={0}
      />
    </div>
  );
};

export default AssetInfo;
