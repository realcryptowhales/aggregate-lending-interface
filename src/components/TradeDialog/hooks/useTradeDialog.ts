import { useState, useEffect, useMemo } from 'react';
// import { readContract } from '@wagmi/core';
// import useSWR from 'swr';
// import { fetcher } from '@api/index';
// import { routerAddr } from '@/constant/contract';
// import { routerABI } from '@/constant/abi';
import useCurrencyList from '@/hooks/useCurrencyList';

export interface CurrencyInfoProps {
  symbol: string;
  icon: string;
  optimization: number; // 内部撮合
  aave: number; // AAVE
  compound: number; // Compound
  outstandingLoan?: number | string; // 贷款余额
  borrowAPRPercent?: string; // 借款APR百分数
  borrowAmount?: number | string; // 借款数量
  depositAPRPercent?: string; // 存款APR百分数
  depositAmount?: number | string; // 存款余额
  maxLTV?: number; // 最高抵押率
  liquidation?: number; // 清算域值
  usedBorrowLimit?: number; // 已用借款限额
}

export interface UseTradeDialogProps {
  type: DialogTypeProps;
  activeCurrency: string;
  currencyDetailList: CurrencyInfoProps[];
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

export interface FormValuesProps {
  number: string | number;
  asCollateral: boolean;
}

const useLendingDialog = ({
  type,
  activeCurrency,
  currencyDetailList
}: UseTradeDialogProps) => {
  const [activeCurrencyInfo, setActiveCurrencyInfo] =
    useState<CurrencyInfoProps>();
  const [tabs, setTabs] = useState<tabsItemProps[]>();
  const [open, setOpen] = useState(true);
  const [infosTop, setInfosTop] = useState<InfosTopItemProps[]>();
  const [balance, setBalance] = useState<number>();
  const [dolors, setDolors] = useState<number>(0);
  const [aprInfo, setAprInfo] = useState<AprInfoProps>();
  const [willBecomeBorrowLimit, setWillBecomeBorrowLimit] = useState<number>();
  const [formValue, setFormValues] = useState<FormValuesProps>({
    number: '',
    asCollateral: true
  });
  const [auth, setAuth] = useState(false);

  const getActiveCurrencyInfo = (name: string) => {
    return currencyDetailList.find((item) => {
      return item.symbol === name;
    });
  };

  const updateActiveCurrencyInfo = () => {
    if (activeCurrency && currencyDetailList) {
      setActiveCurrencyInfo(getActiveCurrencyInfo(activeCurrency));
    }
  };

  const {
    optimization, // 内部撮合
    aave, // AAVE
    compound, // Compound
    outstandingLoan, // 贷款余额
    borrowAPRPercent, // 借款APR百分数
    borrowAmount, // 借款数量
    depositAPRPercent, // 存款APR百分数
    depositAmount, // 存款余额
    maxLTV, // 最高抵押率
    liquidation, // 清算域值
    usedBorrowLimit // 已用借款限额
  } = activeCurrencyInfo || {};

  const handleFormChange = (obj: { [key: string]: any }) => {
    setFormValues({
      ...formValue,
      ...obj
    });
  };

  const currencyBaseInfo = useCurrencyList();

  useEffect(() => {
    if (currencyBaseInfo.data && activeCurrency) {
      const { data } = currencyBaseInfo;
      const activeCurrencyBaseInfo = data.find((item) => {
        return item.symbol === activeCurrency;
      });
      console.log('activeCurrencyBaseInfo', activeCurrencyBaseInfo);
    }
  }, [currencyBaseInfo, activeCurrency]);

  useEffect(() => {
    getBalance();
    init();
    setAuth(true);
    updateActiveCurrencyInfo();
  }, [type, activeCurrency, currencyDetailList]);

  useEffect(() => {
    setDolors(formValue.number > 0 ? Math.random() : 0);
    setWillBecomeBorrowLimit(formValue.number > 0 ? 0.9 : 0);
  }, [formValue.number]);

  const getBestApr = (num?: number) => {
    if (num && optimization && aave && compound) {
      return num === Math.max(optimization, aave, compound);
    }
    return false;
  };

  const toPercent = (num?: number) => {
    return num ? `${parseFloat(Number(num * 100).toFixed(2))}%` : '0%';
  };

  const getBalance = () => {
    if (activeCurrency) {
      setBalance(0);
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
        break;
      default:
        setInfosTop([
          {
            title: '存款 APR',
            value: depositAPRPercent!
          },
          {
            title: `${
              type === DialogTypeProps.deposit ? '存款数量' : '存款余额'
            }(${activeCurrency})`,
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

  const isHighRisk = useMemo(() => {
    return (
      !!willBecomeBorrowLimit &&
      Number(willBecomeBorrowLimit + 0.1) >= Number(liquidation)
    );
  }, [usedBorrowLimit, willBecomeBorrowLimit]);

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
    formValue,
    handleFormChange,
    isHighRisk,
    balance,
    dolors,
    auth
  };
};

export default useLendingDialog;
