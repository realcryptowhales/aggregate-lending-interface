import { useState, useEffect, useMemo } from 'react';
import { UseLendingDialogProps } from '..';

export interface CurrencyInfoProps {
  symbol: string;
  icon: string;
}

export enum DialogTypeProps {
  withdraw,
  deposit,
  borrow,
  repay
}

export interface InfosTopItemProps {
  title: string;
  value: string | number;
}

interface tabsItemProps {
  text: string;
  key: DialogTypeProps;
}

interface AprItemProps {
  title: string;
  value: string;
  isBest?: boolean;
}

export interface AprInfoProps {
  aprTitle: string;
  list: AprItemProps[];
}

const useLendingDialog = ({
  type,
  optimization,
  aave,
  compound,
  outstandingLoan,
  borrowAPRPercent,
  borrowAmount,
  depositAPRPercent,
  depositAmount,
  maxLTV,
  liquidation,
  usedBorrowLimit,
  activeCurrency
}: UseLendingDialogProps) => {
  const [tabs, setTabs] = useState<tabsItemProps[]>();
  const [open, setOpen] = useState(true);
  const [infosTop, setInfosTop] = useState<InfosTopItemProps[]>();
  const [balance, setBalance] = useState<number>();
  const [dolors, setDolors] = useState<number>(0);
  const [aprInfo, setAprInfo] = useState<AprInfoProps>();
  const [willBecomeBorrowLimit, setWillBecomeBorrowLimit] = useState<number>();
  const [formValues, setFormValues] = useState<{ number: string | number }>({
    number: ''
  });

  const handleInputChange = (value: number | string) => {
    setFormValues({
      number: value
    });
  };

  useEffect(() => {
    getBalance();
    init();
  }, [type, activeCurrency]);

  useEffect(() => {
    setDolors(formValues.number > 0 ? Math.random() : 0);
  }, [formValues.number]);

  const getBestApr = (num: number) => {
    return num === Math.max(optimization, aave, compound);
  };

  const toPercent = (num: number) => {
    return `${parseFloat(Number(num * 100).toFixed(2))}%`;
  };

  const getBalance = () => {
    if (activeCurrency) {
      setBalance(1223.2);
    }
  };

  const init = () => {
    switch (type) {
      case DialogTypeProps.repay:
        setInfosTop([
          {
            title: `贷款余额(${activeCurrency})`,
            value: outstandingLoan!
          }
        ]);
        setTabs([
          {
            text: '借款',
            key: DialogTypeProps.borrow
          },
          {
            text: '还款',
            key: DialogTypeProps.repay
          }
        ]);
        setAprInfo({
          aprTitle: '借款APR对比',
          list: [
            {
              title: '内部撮合',
              value: toPercent(optimization!),
              isBest: getBestApr(optimization!)
            },
            {
              title: 'AAVE',
              value: toPercent(aave!),
              isBest: getBestApr(aave!)
            },
            {
              title: 'Compound',
              value: toPercent(compound!),
              isBest: getBestApr(compound!)
            }
          ]
        });
        break;
      case DialogTypeProps.borrow:
        setInfosTop([
          {
            title: '借款 APR',
            value: borrowAPRPercent!
          },
          {
            title: `借款数量(${activeCurrency})`,
            value: borrowAmount!
          }
        ]);
        setTabs([
          {
            text: '借款',
            key: DialogTypeProps.borrow
          },
          {
            text: '还款',
            key: DialogTypeProps.repay
          }
        ]);
        setAprInfo({
          aprTitle: '借款APR对比',
          list: [
            {
              title: '内部撮合',
              value: toPercent(optimization!),
              isBest: getBestApr(optimization!)
            },
            {
              title: 'AAVE',
              value: toPercent(aave!),
              isBest: getBestApr(aave!)
            },
            {
              title: 'Compound',
              value: toPercent(compound!),
              isBest: getBestApr(compound!)
            }
          ]
        });
        break;
      default:
        setInfosTop([
          {
            title: '存款 APR',
            value: depositAPRPercent!
          },
          {
            title: `存款数量(${activeCurrency})`,
            value: depositAmount!
          }
        ]);
        setTabs([
          {
            text: '存款',
            key: DialogTypeProps.deposit
          },
          {
            text: '取款',
            key: DialogTypeProps.withdraw
          }
        ]);
        setAprInfo({
          aprTitle: '存款APR对比',
          list: [
            {
              title: '内部撮合',
              value: toPercent(optimization),
              isBest: getBestApr(optimization)
            },
            {
              title: 'AAVE',
              value: toPercent(aave),
              isBest: getBestApr(aave)
            },
            {
              title: 'Compound',
              value: toPercent(compound),
              isBest: getBestApr(compound)
            }
          ]
        });
    }
  };

  const showMaxLTV = useMemo(() => {
    return type === DialogTypeProps.borrow;
  }, [type]);

  const isOverLiquidation = useMemo(() => {
    return (
      Number(usedBorrowLimit) >= Number(liquidation) ||
      (!!willBecomeBorrowLimit &&
        Number(willBecomeBorrowLimit) >= Number(liquidation))
    );
  }, [usedBorrowLimit, willBecomeBorrowLimit]);

  const maxLTVPercent = useMemo(() => {
    return maxLTV ? toPercent(maxLTV) : '0%';
  }, [maxLTV]);

  const usedBorrowLimitPercent = useMemo(() => {
    return usedBorrowLimit ? toPercent(usedBorrowLimit) : '0%';
  }, [usedBorrowLimit]);

  const liquidationPercent = useMemo(() => {
    return liquidation ? toPercent(liquidation) : '0%';
  }, [liquidation]);

  const willBecomeBorrowLimitPercent = useMemo(() => {
    return willBecomeBorrowLimit ? toPercent(willBecomeBorrowLimit) : '0%';
  }, [willBecomeBorrowLimit]);

  return {
    tabs,
    open,
    setOpen,
    activeCurrency,
    infosTop,
    aprInfo,
    showMaxLTV,
    isOverLiquidation,
    maxLTVPercent,
    usedBorrowLimitPercent,
    liquidationPercent,
    willBecomeBorrowLimitPercent,
    formValues,
    handleInputChange,
    balance,
    dolors
  };
};

export default useLendingDialog;
