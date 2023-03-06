import React, { useMemo } from 'react';
import style from './index.module.less';
import cls from 'classnames';
import { Tooltip } from '@mui/material';
import { useStore } from '@/stores';
import {
  formatPercent,
  thousandCurrency,
  thousandNumber
} from '@/utils/format';
import { observer } from 'mobx-react-lite';
// interface Props {
// title: React.ReactNode;
// secondTitle?: string;
// children: React.ReactNode;
// }
const InfoItem: React.FC<{
  title: string;
  amount: string;
  percentText?: React.ReactNode;
  percent?: string;
  hasTips?: boolean;
}> = ({ title, amount, percentText, percent, hasTips }) => {
  return (
    <div style={{ marginRight: 59, minWidth: 180 }}>
      <div className={style.title}>{title}</div>
      <div className={style.amount}>{amount}</div>
      {percentText && (
        <div className={cls('flex items-center', style.percent)}>
          <span className={style.percentText}>{percentText}</span>
          <span className={style.percentNumber}>{percent}</span>
          {hasTips && (
            <Tooltip style={{ marginLeft: 6 }} title="Add" arrow>
              <i
                className={cls(
                  'iconfont icon-exclamation-circle-o cursor-pointer'
                )}
                style={{ color: '#000000', fontSize: 15, marginLeft: 6 }}
              />
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};
// eslint-disable-next-line no-empty-pattern
const AssetInfo: React.FC = ({}) => {
  const {
    porfolioStore: {
      userTotalSupplied,
      totalSuppliedApr,
      userTotalBorrowed,
      totalBorrowedApr,
      dailyEstProfit,
      netProfit,
      collateralValue,
      usedRatio,
      borrowLimit
    }
  } = useStore();
  const thousandCollateralValue = useMemo(() => {
    if (Number.isNaN(+collateralValue) || !collateralValue) return '--';
    return thousandCurrency(+collateralValue, 4);
  }, [collateralValue]);
  const percentUsedRatio = useMemo(() => {
    if (Number.isNaN(+usedRatio)) return '0%';
    return formatPercent(+usedRatio);
  }, [usedRatio]);
  const thousandBorrowLimit = useMemo(() => {
    if (Number.isNaN(+borrowLimit) || !borrowLimit) return '--';
    return thousandCurrency(+borrowLimit, 4);
  }, [borrowLimit]);
  return (
    <div className={cls(style.container)}>
      <InfoItem
        title={'总存款金额'}
        amount={
          userTotalSupplied ? thousandCurrency(userTotalSupplied, 6) : '--'
        }
        percentText={'总存款APR'}
        percent={totalSuppliedApr ? formatPercent(totalSuppliedApr) : '--'}
      />
      <InfoItem
        title={'总借款金额'}
        amount={
          userTotalBorrowed ? thousandCurrency(userTotalBorrowed, 6) : '--'
        }
        percentText={'总借款APR'}
        percent={totalBorrowedApr ? formatPercent(totalBorrowedApr) : '--'}
      />
      <InfoItem
        title={'今日预估总收益'}
        amount={dailyEstProfit ? thousandCurrency(dailyEstProfit, 6) : '--'}
        percentText="净收益率"
        percent={netProfit ? formatPercent(netProfit) : '--'}
        hasTips
      />
      <InfoItem title={'总抵押品价值'} amount={thousandCollateralValue} />
      <div className={style.limit}>
        <div className={style.title}>借款限额</div>
        <div className={cls('flex justify-between', style.percent)}>
          <span>已用比例</span>
          <span>{percentUsedRatio}</span>
        </div>
        <div
          style={{
            backgroundColor: '#EBEBEB',
            height: 4,
            position: 'relative',
            margin: '6px 0px',
            borderRadius: '2px'
          }}
        >
          <div
            style={{
              backgroundColor: '#424242',
              width: percentUsedRatio,
              height: 4,
              borderRadius: '2px'
            }}
          ></div>
          <div
            className={style.arrow}
            style={{ left: `calc(${percentUsedRatio} - 3px)`, top: '-6px' }}
          ></div>
        </div>
        <div className={cls('flex justify-between', style.percent)}>
          <span>最多可借</span>
          <span>{thousandBorrowLimit}</span>
        </div>
      </div>
    </div>
  );
};

export default observer(AssetInfo);
