import { useState, useMemo } from 'react';
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
  FormValuesProps,
  FormStatusProps,
  UserStatusProps
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
  formatCurrencyNumber,
  divideBigNumber,
  divideString
} from '../utils';
import useTradeContract from './useTradeContract';

const useTradeDialog = ({ type, activeCurrency }: UseTradeDialogProps) => {
  const [open, setOpen] = useState(true);
  const [formValue, setFormValues] = useState<FormValuesProps>({
    number: ''
  });
  const [userStatus, setUserStatus] = useState<UserStatusProps>();
  const [allowance, setAllowance] = useState<string>('0');
  // 获取币种的列表和一些基础的币种信息
  const currencyBaseInfoList = useCurrencyList();
  // 获取用户钱包地址
  const { address } = useAccount();

  // 更新ActiveCurrencyBaseInfo
  const activeCurrencyBaseInfo = useMemo((): CurrencyBaseInfoProps => {
    if (currencyBaseInfoList && activeCurrency) {
      return (
        currencyBaseInfoList.find((item) => {
          return item?.symbol?.toLowerCase() === activeCurrency.toLowerCase();
        }) || {}
      );
    }
    return {};
  }, [currencyBaseInfoList, activeCurrency]);

  // 更新当前币种的详细信息
  const activeCurrencyInfo = useMemo((): CurrencyInfoProps => {
    if (userStatus) {
      const {
        assetPrice, // 资产价格
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
      } = userStatus || {};
      const depositAmount = formatCurrencyNumber({
        big: supplied,
        decimal: activeCurrencyBaseInfo?.decimal
      }); // 存款余额
      const isWithdrawAndDeposit = [
        DialogTypeProps.withdraw,
        DialogTypeProps.deposit
      ].includes(type);
      return {
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
        maxLTV: divideBigNumber(borrowLimit, tatalCollateral), // 最高抵押率
        liquidation: divideBigNumber(liquidateThreashold, tatalCollateral), // 清算域值
        usedBorrowLimit: divideBigNumber(borrowed, tatalCollateral), // 已用借款限额
        assetPrice: formatPriceNumber(assetPrice), // 资产价格
        usingAsCollateral,
        totalBorrowed: formatCurrencyNumber({
          big: totalBorrowed,
          decimal: activeCurrencyBaseInfo?.decimal
        }),
        tatalCollateral: formatCurrencyNumber({
          big: tatalCollateral,
          decimal: activeCurrencyBaseInfo?.decimal
        })
      };
    }
    return {};
  }, [userStatus, activeCurrencyBaseInfo, type]);

  const balance = useMemo(() => {
    const {
      userBalance, // 用户余额
      supplied, // 存款数量
      borrowLimit // 借款上限
    } = userStatus || {};
    if (userBalance) {
      const depositAmount = formatCurrencyNumber({
        big: supplied,
        decimal: activeCurrencyBaseInfo?.decimal
      }); // 存款余额
      switch (type) {
        case DialogTypeProps.withdraw:
          return depositAmount;
        case DialogTypeProps.borrow:
          return formatCurrencyNumber({
            big: borrowLimit,
            decimal: activeCurrencyBaseInfo?.decimal
          });
        default:
          return formatCurrencyNumber({
            big: userBalance,
            decimal: activeCurrencyBaseInfo?.decimal
          });
      }
    }
    return '';
  }, [userStatus, type, activeCurrencyBaseInfo]);

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
    assetPrice,
    totalBorrowed,
    tatalCollateral
  } = activeCurrencyInfo || {};

  // 合约请求参数
  const contractsArgs = useMemo(() => {
    let res: ContractsArgsProps[] = [];
    // 获取当前active币种的授权数量
    if (
      address &&
      activeCurrencyBaseInfo?.sToken &&
      activeCurrencyBaseInfo?.address
    ) {
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
          setUserStatus(data[1]);
        }
      }
    }
  });

  const handleFormChange = (obj: { [key: string]: any }) => {
    setFormValues({
      ...formValue,
      ...obj
    });
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

  const infosTop = useMemo((): InfosTopItemProps[] => {
    switch (type) {
      case DialogTypeProps.repay:
        return [
          {
            title: `贷款余额(${activeCurrency})`,
            value: borrowAmount!
          }
        ];
      case DialogTypeProps.borrow:
        return [
          {
            title: '借款 APR',
            value: borrowAPRPercent!
          },
          {
            title: `借款数量(${activeCurrency})`,
            value: borrowAmount!
          }
        ];
      default:
        return [
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
        ];
    }
  }, [
    type,
    activeCurrency,
    borrowAmount,
    depositAPRPercent,
    borrowAPRPercent,
    depositAmount
  ]);

  const aprInfo = useMemo((): AprInfoProps => {
    switch (type) {
      case DialogTypeProps.repay:
        return {
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
        };
      case DialogTypeProps.borrow:
        return {
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
        };
      default:
        return {
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
        };
    }
  }, [type, activeCurrency, optimization, aave, compound]);

  const tabs = useMemo((): tabsItemProps[] => {
    switch (type) {
      case DialogTypeProps.repay:
        return [
          {
            text: '借款',
            key: DialogTypeProps.borrow
          },
          {
            text: '还款',
            key: DialogTypeProps.repay
          }
        ];
      case DialogTypeProps.borrow:
        return [
          {
            text: '借款',
            key: DialogTypeProps.borrow
          },
          {
            text: '还款',
            key: DialogTypeProps.repay
          }
        ];
      default:
        return [
          {
            text: '存款',
            key: DialogTypeProps.deposit
          },
          {
            text: '取款',
            key: DialogTypeProps.withdraw
          }
        ];
    }
  }, [type, activeCurrency]);

  // 是否展示Max LTV
  const showMaxLTV = useMemo(() => {
    return type === DialogTypeProps.borrow;
  }, [type]);

  // 计算新借款限额
  const willBecomeBorrowLimit = useMemo((): string => {
    if (formValue.number && formValue.number !== '0') {
      switch (type) {
        case DialogTypeProps.deposit:
          return (
            (borrowAmount &&
              tatalCollateral &&
              divideString(
                borrowAmount,
                BN(tatalCollateral).plus(formValue.number).toString()
              )) ||
            '0'
          );
        case DialogTypeProps.borrow:
          return (
            (borrowAmount &&
              tatalCollateral &&
              divideString(
                BN(formValue.number).plus(borrowAmount).toString(),
                tatalCollateral
              )) ||
            '0'
          );
        case DialogTypeProps.withdraw:
          return (
            (borrowAmount &&
              tatalCollateral &&
              BN(formValue.number).isLessThan(tatalCollateral) &&
              divideString(
                borrowAmount,
                BN(tatalCollateral).minus(formValue.number).toString()
              )) ||
            '0'
          );
        case DialogTypeProps.repay:
          return (
            (borrowAmount &&
              tatalCollateral &&
              BN(formValue.number).isLessThan(borrowAmount) &&
              divideString(
                BN(borrowAmount).minus(formValue.number).toString(),
                tatalCollateral
              )) ||
            '0'
          );
        default:
          return '0';
      }
    }
    return '0';
  }, [
    formValue.number,
    activeCurrency,
    assetPrice,
    borrowAmount,
    tatalCollateral,
    type
  ]);

  // 计算新抵押率
  const willBecomeLTV = useMemo(() => {
    if (formValue.number && formValue.number !== '0') {
      switch (type) {
        case DialogTypeProps.deposit:
          return (
            (totalBorrowed &&
              tatalCollateral &&
              divideString(
                totalBorrowed,
                BN(tatalCollateral).plus(formValue.number).toString()
              )) ||
            '0'
          );
        case DialogTypeProps.borrow:
          return (
            (totalBorrowed &&
              tatalCollateral &&
              divideString(
                BN(formValue.number).plus(totalBorrowed).toString(),
                tatalCollateral
              )) ||
            '0'
          );
        case DialogTypeProps.withdraw:
          return (
            (totalBorrowed &&
              tatalCollateral &&
              BN(formValue.number).isLessThan(tatalCollateral) &&
              divideString(
                totalBorrowed,
                BN(tatalCollateral).minus(formValue.number).toString()
              )) ||
            '0'
          );
        case DialogTypeProps.repay:
          return (
            (totalBorrowed &&
              tatalCollateral &&
              BN(totalBorrowed).isLessThan(formValue.number) &&
              divideString(
                BN(formValue.number).minus(totalBorrowed).toString(),
                tatalCollateral
              )) ||
            '0'
          );
        default:
          return '0';
      }
    }
    return '0';
  }, [formValue.number, activeCurrency, totalBorrowed, type]);

  // 是否超出清算域值
  const isOverLiquidation = useMemo(() => {
    return (
      (!!liquidation &&
        !!usedBorrowLimit &&
        BN(liquidation).isLessThan(usedBorrowLimit)) ||
      (!!willBecomeBorrowLimit &&
        !!liquidation &&
        BN(liquidation).isLessThan(willBecomeBorrowLimit))
    );
  }, [usedBorrowLimit, willBecomeBorrowLimit]);

  // 最高抵押率百分比
  const maxLTVPercent = useMemo(() => {
    return toPercent(maxLTV);
  }, [maxLTV]);

  // 用户已用借款限额百分比
  const usedBorrowLimitPercent = useMemo(() => {
    return toPercent(usedBorrowLimit);
  }, [usedBorrowLimit]);

  // 清算域值百分比
  const liquidationPercent = useMemo(() => {
    return toPercent(liquidation);
  }, [liquidation]);

  // 用户将借款限额百分比
  const willBecomeBorrowLimitPercent = useMemo(() => {
    return toPercent(willBecomeBorrowLimit);
  }, [willBecomeBorrowLimit]);

  // 用户将抵押率百分比
  const willBecomeLTVPercent = useMemo(() => {
    return toPercent(willBecomeLTV);
  }, [willBecomeLTV]);

  // 是否是高风险
  const isHighRisk = useMemo(() => {
    return (
      !!willBecomeBorrowLimit &&
      !!maxLTV &&
      BN(maxLTV).isLessThan(willBecomeBorrowLimit)
    );
  }, [maxLTV, willBecomeBorrowLimit]);

  // 更新auth状态
  const auth = useMemo((): boolean => {
    if (formValue.number) {
      return BN(formValue.number).isLessThan(allowance);
    }
    return true;
  }, [allowance, formValue]);

  // 更新美元价值
  const dolors = useMemo((): string => {
    if (formValue?.number && assetPrice) {
      return cutZero(BN(formValue.number).times(assetPrice).toFixed(2, 1));
    }
    return '0';
  }, [formValue.number, activeCurrency, assetPrice]);

  // 获取是否作为抵押
  const isAsCollateral = useMemo(() => {
    return Boolean(activeCurrencyInfo?.usingAsCollateral);
  }, [activeCurrencyInfo]);

  const getFormError = () => {
    const { number } = formValue;
    if (balance && BN(balance).isLessThan(number)) {
      return {
        isError: true,
        errorMsg: '输入值大于最大可输入值'
      };
    }
    if (number === '0') {
      return {
        isError: true,
        errorMsg: '输入值需大于最大0'
      };
    }
    if (
      type === DialogTypeProps.repay &&
      borrowAmount &&
      BN(borrowAmount).isLessThan(number)
    ) {
      return {
        isError: true,
        errorMsg: '输入值需小于贷款余额'
      };
    }
    return {
      isError: false,
      errorMsg: ''
    };
  };

  // 更新Input的disabled、errorMsg、isError
  const formStatus = useMemo((): FormStatusProps => {
    const { number } = formValue;
    switch (type) {
      case DialogTypeProps.deposit:
        return {
          disabled: Boolean(
            !auth ||
              !number ||
              (balance && BN(balance).isLessThan(number)) ||
              number === '0'
          ),
          ...getFormError()
        };
      case DialogTypeProps.withdraw:
        return {
          disabled: Boolean(
            !number ||
              isOverLiquidation ||
              number === '0' ||
              (balance && BN(balance).isLessThan(number))
          ),
          ...getFormError()
        };
      case DialogTypeProps.borrow:
        return {
          disabled: Boolean(
            !number ||
              isOverLiquidation ||
              number === '0' ||
              (balance && BN(balance).isLessThan(number))
          ),
          ...getFormError()
        };
      case DialogTypeProps.repay:
        return {
          disabled: Boolean(
            !auth ||
              !number ||
              number === '0' ||
              (balance && BN(balance).isLessThan(number)) ||
              (borrowAmount && BN(borrowAmount).isLessThan(number))
          ),
          ...getFormError()
        };
      default:
        return {
          disabled: true,
          isError: false,
          errorMsg: ''
        };
    }
  }, [type, activeCurrency, auth, formValue, balance, borrowAmount]);

  const {
    onApprove,
    tipDialog,
    snackbar,
    onDeposit,
    onWithdraw,
    onBorrow,
    onRepay,
    setUsingAsCollateral
  } = useTradeContract({
    activeCurrencyBaseInfo,
    formValue,
    activeCurrencyInfo,
    isHighRisk,
    willBecomeBorrowLimitPercent,
    liquidationPercent,
    willBecomeLTVPercent
  });

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
    currencyBaseInfoList,
    formStatus,
    isAsCollateral,
    setUsingAsCollateral
  };
};

export default useTradeDialog;
