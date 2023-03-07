import { useState, useEffect, useMemo } from 'react';
import { useAccount, useContractReads } from 'wagmi';
import {
  DialogTypeProps,
  ContractsArgsProps,
  CurrencyBaseInfoProps,
  UseTradeDialogProps,
  CurrencyInfoProps,
  InfosTopItemProps,
  tabsItemProps,
  AprInfoProps,
  FormValuesProps
} from '@/constant/type';
import BN from 'bignumber.js';
import { routerAddr, queryHelperContractAddr } from '@/constant/contract';
import { sTokenABI, queryHelperABI } from '@/constant/abi';
import useCurrencyList from '@/hooks/useCurrencyList';
import {
  toPercent,
  cutZero,
  formatRatePercent,
  formatRateNumber,
  formatPriceNumber,
  formatCurrencyNumber
} from '../utils';
import useTradeContract from './useTradeContract';

const useTradeDialog = ({ type, activeCurrency }: UseTradeDialogProps) => {
  const [activeCurrencyInfo, setActiveCurrencyInfo] =
    useState<CurrencyInfoProps>();
  const [activeCurrencyBaseInfo, setActiveCurrencyBaseInfo] =
    useState<CurrencyBaseInfoProps>();
  const [tabs, setTabs] = useState<tabsItemProps[]>();
  const [open, setOpen] = useState(true);
  const [infosTop, setInfosTop] = useState<InfosTopItemProps[]>();
  const [balance, setBalance] = useState<string>();
  const [dolors, setDolors] = useState<string>('0');
  const [aprInfo, setAprInfo] = useState<AprInfoProps>();
  const [willBecomeBorrowLimit, setWillBecomeBorrowLimit] = useState<string>();
  const [formValue, setFormValues] = useState<FormValuesProps>({
    number: '',
    asCollateral: true
  });
  const [auth, setAuth] = useState(true);
  const [allowance, setAllowance] = useState<string>('0');
  const {
    optimization, // 内部撮合
    aave, // AAVE
    compound, // Compound
    borrowAPRPercent, // 借款APR百分数
    borrowAmount, // 借款数量
    depositAPRPercent, // 存款APR百分数
    depositAmount, // 存款余额
    maxLTV, // 最高抵押率
    liquidation, // 清算域值
    usedBorrowLimit, // 已用借款限额
    assetPrice
  } = activeCurrencyInfo || {};

  const handleFormChange = (obj: { [key: string]: any }) => {
    setFormValues({
      ...formValue,
      ...obj
    });
  };

  // 获取币种的列表和一些基础的币种信息
  const currencyBaseInfoList = useCurrencyList();

  // 获取用户钱包地址
  const { address } = useAccount();

  // 更新当前币种的详细信息
  const updateActiveCurrencyInfo = (info: { [key: string]: any }) => {
    const {
      assetPrice, // 资产价格
      userBalance, // 用户余额
      borrowed, // 借款数量
      supplied, // 存款数量
      totalBorrowed, //总借款
      tatalCollateral, //总抵押
      borrowLimit, // 借款上限
      liquidateThreashold, // 清算阈值
      usingAsCollateral, //是否用作抵押资产
      supplyRate, // 存款利率
      borrowRate, //借款利率
      supplyRates, // 底层协议存款利率
      borrowRates // 底层协议借款利率
    } = info;
    const depositAmount = formatCurrencyNumber({
      big: supplied,
      decimal: activeCurrencyBaseInfo?.decimal
    }); // 存款余额
    switch (type) {
      case DialogTypeProps.withdraw:
        setBalance(depositAmount);
        break;
      case DialogTypeProps.borrow:
        setBalance(
          formatCurrencyNumber({
            big: borrowLimit,
            decimal: activeCurrencyBaseInfo?.decimal
          })
        );
        break;
      default:
        setBalance(
          formatCurrencyNumber({
            big: userBalance,
            decimal: activeCurrencyBaseInfo?.decimal
          })
        );
        break;
    }
    const isWithdrawAndDeposit = [
      DialogTypeProps.withdraw,
      DialogTypeProps.deposit
    ].includes(type);
    setActiveCurrencyInfo({
      optimization: formatRateNumber(
        isWithdrawAndDeposit ? supplyRate : borrowRate
      ), // 内部撮合
      aave: formatRateNumber(
        isWithdrawAndDeposit ? supplyRates[0] : borrowRates[0]
      ), // AAVE
      compound: formatRateNumber(
        isWithdrawAndDeposit ? supplyRates[1] : borrowRates[1]
      ), // Compound
      borrowAPRPercent: formatRatePercent(borrowRate), // 借款APR百分数
      borrowAmount: formatCurrencyNumber({
        big: borrowed,
        decimal: activeCurrencyBaseInfo?.decimal
      }), // 借款数量
      depositAPRPercent: formatRatePercent(supplyRate), // 存款APR百分数
      depositAmount, // 存款余额
      maxLTV: formatRateNumber(borrowLimit.mod(tatalCollateral)), // 最高抵押率
      liquidation: formatRateNumber(liquidateThreashold.mod(tatalCollateral)), // 清算域值
      usedBorrowLimit: formatRateNumber(borrowed.mod(tatalCollateral)), // 已用借款限额
      assetPrice: formatPriceNumber(assetPrice), // 资产价格
      usingAsCollateral
    });
  };

  // 合约请求参数
  const contractsArgs = useMemo(() => {
    let res: ContractsArgsProps[] = [];
    // 获取当前active币种的授权数量
    if (address && activeCurrencyBaseInfo?.sToken) {
      res = [
        ...res,
        {
          address: activeCurrencyBaseInfo?.address,
          abi: sTokenABI,
          functionName: 'allowance',
          args: [address, routerAddr]
        }
      ];
    }
    // 获取当前币种的详细数据
    if (address && activeCurrencyBaseInfo?.address) {
      res = [
        ...res,
        {
          address: queryHelperContractAddr,
          abi: queryHelperABI,
          functionName: 'getUserStatus',
          args: [address, activeCurrencyBaseInfo?.address]
        }
      ];
    }
    return res;
  }, [address, activeCurrencyBaseInfo]);

  // 获取当前active币种的授权数量 & 获取当前币种的详细数据
  useContractReads({
    contracts: contractsArgs,
    watch: true,
    onSuccess(data: any[]) {
      if (data && data.length) {
        if (data[0]) {
          setAllowance(
            formatCurrencyNumber({
              big: data[0],
              decimal: activeCurrencyBaseInfo?.decimal
            })
          );
        }
        if (data[1]) {
          updateActiveCurrencyInfo(data[1]);
        }
      }
    }
  });

  // 更新balance
  const updateBalance = () => {
    setBalance('0');
    // type === DialogTypeProps.deposit 通过 useBalance更新
  };

  const getBestApr = (num?: string) => {
    if (num && optimization && aave && compound) {
      const bigger = BN(compound).comparedTo(aave) === 1 ? compound : aave;
      const biggest =
        BN(optimization).comparedTo(bigger) === 1 ? optimization : bigger;
      return num === biggest;
    }
    return false;
  };

  const init = () => {
    switch (type) {
      case DialogTypeProps.repay:
        setInfosTop([
          {
            title: `贷款余额(${activeCurrency})`,
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

  // 是否展示Max LTV
  const showMaxLTV = useMemo(() => {
    return type === DialogTypeProps.borrow;
  }, [type]);

  // 是否超出清算域值
  const isOverLiquidation = useMemo(() => {
    return (
      Number(usedBorrowLimit) >= Number(liquidation) ||
      (!!willBecomeBorrowLimit &&
        Number(willBecomeBorrowLimit) >= Number(liquidation))
    );
  }, [usedBorrowLimit, willBecomeBorrowLimit]);

  // 最高抵押率百分比
  const maxLTVPercent = useMemo(() => {
    return maxLTV ? toPercent(maxLTV) : '0%';
  }, [maxLTV]);

  // 用户已用借款限额百分比
  const usedBorrowLimitPercent = useMemo(() => {
    return usedBorrowLimit ? toPercent(usedBorrowLimit) : '0%';
  }, [usedBorrowLimit]);

  // 清算域值百分比
  const liquidationPercent = useMemo(() => {
    return liquidation ? toPercent(liquidation) : '0%';
  }, [liquidation]);

  // 用户将借款限额百分比
  const willBecomeBorrowLimitPercent = useMemo(() => {
    return willBecomeBorrowLimit ? toPercent(willBecomeBorrowLimit) : '0%';
  }, [willBecomeBorrowLimit]);

  // 是否是高风险
  const isHighRisk = useMemo(() => {
    return (
      !!willBecomeBorrowLimit &&
      Number(willBecomeBorrowLimit + 0.1) >= Number(liquidation)
    );
  }, [usedBorrowLimit, willBecomeBorrowLimit]);

  const {
    onApprove,
    tipDialog,
    snackbar,
    onDeposit,
    onWithdraw,
    onBorrow,
    onRepay
  } = useTradeContract({ activeCurrencyBaseInfo, formValue });

  // 更新auth状态
  useEffect(() => {
    if (formValue.number) {
      setAuth(BN(formValue.number).isLessThan(allowance));
    } else {
      setAuth(true);
    }
  }, [allowance, formValue]);

  // 更新借款限额 和 美元价值
  useEffect(() => {
    formValue?.number &&
      assetPrice &&
      setDolors(cutZero(BN(formValue.number).times(assetPrice).toFixed(2, 1)));
    setWillBecomeBorrowLimit('0.9');
  }, [formValue.number]);

  // 更新ActiveCurrencyBaseInfo
  useEffect(() => {
    if (currencyBaseInfoList && activeCurrency) {
      const activeCurrencyBaseInfo = currencyBaseInfoList.find((item) => {
        return item.symbol === activeCurrency;
      });
      setActiveCurrencyBaseInfo(activeCurrencyBaseInfo);
    }
  }, [currencyBaseInfoList, activeCurrency]);

  // 启动弹窗后初始化
  useEffect(() => {
    updateBalance();
    init();
    // updateActiveCurrencyInfo();
  }, [type, activeCurrency]);

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
    auth,
    onApprove,
    tipDialog,
    snackbar,
    onDeposit,
    onWithdraw,
    onRepay,
    onBorrow,
    currencyBaseInfoList
  };
};

export default useTradeDialog;
