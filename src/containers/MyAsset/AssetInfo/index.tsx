import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import { Box, LinearProgress } from '@mui/material';
// interface Props {
// title: React.ReactNode;
// secondTitle?: string;
// children: React.ReactNode;
// }
const InfoItem: React.FC<{
  title: string;
  amount: number;
  percentText?: string;
  percent?: number;
}> = ({ title, amount, percentText, percent }) => {
  return (
    <div style={{ marginRight: 59, minWidth: 180 }}>
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
      <InfoItem title={'总抵押品价值'} amount={0} />
      <div className={style.limit}>
        <div className={style.title}>借款限额</div>
        <div className={cls('flex justify-between')}>
          <span>已用比例</span>
          <span>{1231}</span>
        </div>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            height: 4,
            position: 'relative',
            margin: '6px 0px'
          }}
        >
          <div
            style={{ backgroundColor: '#424242', width: '50%', height: 4 }}
          ></div>
          {/* <div
            style={{
              backgroundColor: '#424242',
              height: 4,
              width: 4,
              position: 'absolute',
              left: '50%',
              top: -4
            }}
          ></div> */}
        </div>
        <div className={cls('flex justify-between')}>
          <span>最多可借</span>
          <span>{2322}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
