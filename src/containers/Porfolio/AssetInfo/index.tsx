import React, { useEffect, useMemo, useState } from 'react';
import style from './index.module.less';
import cls from 'classnames';
import { Button, Tooltip } from '@mui/material';
import { useStore } from '@/stores';
import {
  formatPercent,
  thousandCurrency,
  thousandNumber
} from '@/utils/format';
import { observer } from 'mobx-react-lite';
import SmallDialog from '@/components/SmallDialog';
import BigNumber from 'bignumber.js';
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
    <div style={{ minWidth: 180 }}>
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
      borrowLimit,
      totalAvailableBorrow,
      curLtv,
      liquidateThreashold,
      maxLtv
    }
  } = useStore();
  const thousandCollateralValue = useMemo(() => {
    if (Number.isNaN(+collateralValue) || !collateralValue) return '--';
    return thousandCurrency(collateralValue);
  }, [collateralValue]);
  const percentUsedRatio = useMemo(() => {
    return usedRatio ? formatPercent(usedRatio) : '--';
  }, [usedRatio]);
  const percentCltv = useMemo(() => {
    return curLtv ? formatPercent(curLtv) : '--';
  }, [curLtv]);
  const thousandBorrowLimit = useMemo(() => {
    if (Number.isNaN(+borrowLimit) || !borrowLimit) return '--';
    return thousandCurrency(borrowLimit);
  }, [borrowLimit]);
  console.log('usedRatio', usedRatio);
  console.log('netProfit', netProfit);

  const [liquidationModal, setLiquidationModal] = useState(false);
  const [hasClosedModal, setHasClosedModal] = useState(false);
  useEffect(() => {
    const v = new BigNumber(liquidateThreashold)
      .minus(new BigNumber(curLtv))
      .lte(0.1);
    console.log('hasClosedModal', hasClosedModal);
    !hasClosedModal && setLiquidationModal(v);
  }, [liquidateThreashold, curLtv, hasClosedModal]);
  return (
    <>
      <div className={cls(style.container)}>
        <InfoItem
          title={'总存款金额'}
          amount={
            userTotalSupplied ? thousandCurrency(userTotalSupplied) : '--'
          }
          percentText={'总存款APR'}
          percent={totalSuppliedApr ? formatPercent(totalSuppliedApr) : '--'}
        />
        <InfoItem
          title={'总借款金额'}
          amount={
            userTotalBorrowed ? thousandCurrency(userTotalBorrowed) : '--'
          }
          percentText={'总借款APR'}
          percent={totalBorrowedApr ? formatPercent(totalBorrowedApr) : '--'}
        />
        <InfoItem
          title={'今日预估总收益'}
          amount={dailyEstProfit ? thousandCurrency(dailyEstProfit) : '--'}
          percentText="净收益率"
          percent={netProfit ? formatPercent(netProfit) : '--'}
          hasTips
        />
        <InfoItem title={'总抵押品价值'} amount={thousandCollateralValue} />
        <div className={style.limit}>
          <div className={cls('flex justify-between', style.font14)}>
            <span>可借款额度</span>
            <span>{thousandBorrowLimit}</span>
          </div>
          <div className={cls('flex justify-between', style.font14)}>
            <span>剩余可借额度</span>
            <span>
              {totalAvailableBorrow
                ? thousandCurrency(totalAvailableBorrow)
                : '--'}
            </span>
          </div>
        </div>
        <div className={style.wrap}>
          <div className={cls('flex justify-between', style.font14)}>
            <span>当前抵押率</span>
            <span>{percentCltv}</span>
          </div>
          <div>
            <div className={cls('flex justify-between', style.font14)}>
              <span>Max Ltv</span>
              <span>{maxLtv ? formatPercent(maxLtv) : '--'}</span>
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
                  width: `${+curLtv * 100}%`,

                  height: 4,
                  borderRadius: '2px'
                }}
              ></div>
              <div
                className={style.arrow}
                style={{ left: `calc(${+maxLtv * 100}% - 3px)`, top: '-6px' }}
              ></div>
              <div
                className={style.liquidation}
                style={{
                  left: `calc(${+liquidateThreashold * 100}% - 3px)`
                }}
              ></div>
            </div>
            <div className={cls('flex justify-between', style.font14)}>
              <span color="#dd1f16">Liauidation</span>
              <span color="#DD1F16">
                {liquidateThreashold
                  ? formatPercent(liquidateThreashold)
                  : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <SmallDialog
        open={liquidationModal}
        title="清算提醒"
        content={
          <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
            你当前的仓位抵押率过高，即将面临清算，请增加抵押品或者偿还部分借款。
          </div>
        }
        button={
          <Button
            style={{
              width: '130px',
              height: '40px'
            }}
            sx={{
              background: '#000000',
              color: '#ffffff',
              '&:hover': { background: '#000000' }
            }}
            onClick={() => {
              setLiquidationModal(false);
              setHasClosedModal(true);
            }}
          >
            我已知晓
          </Button>
        }
        handleClose={() => {
          setLiquidationModal(false);
          setHasClosedModal(true);
        }}
      ></SmallDialog>
    </>
  );
};

export default observer(AssetInfo);
