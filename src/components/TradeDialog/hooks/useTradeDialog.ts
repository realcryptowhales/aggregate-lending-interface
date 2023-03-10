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
    number: '',
    asCollateral: undefined
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
    const {
      assetPrice, // 资产价格
      borrowed, // 借款数量
      supplied, // 存款数量
      totalBorrowed, //总借款
      tatalCollateral, //总抵押
      // borrowLimit, // 借款上限
      liquidateThreashold, // 清算阈值
      usingAsCollateral, //是否用作抵押资产
      supplyRate, // 存款利率
      borrowRate, //借款利率
      supplyRates, // 底层协议存款利率
      borrowRates, // 底层协议借款利率
      assetConfig
    } = userStatus || {};
    const {
      maxLTV // 最大抵押率
    } = assetConfig || {};
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
        isWithdrawAndDeposit ? supplyRates?.[0] : borrowRates?.[0]
      ), // AAVE
      compound: formatRateNumber(
        isWithdrawAndDeposit ? supplyRates?.[1] : borrowRates?.[1]
      ), // Compound
      borrowAPRPercent: formatRatePercent(borrowRate), // 借款APR百分数
      borrowAmount: formatCurrencyNumber({
        big: borrowed,
        decimal: activeCurrencyBaseInfo?.decimal
      }), // 借款数量
      depositAPRPercent: formatRatePercent(supplyRate), // 存款APR百分数
      depositAmount, // 存款余额
      assetPrice: formatPriceNumber(assetPrice), // 资产价格
      usingAsCollateral: Boolean(usingAsCollateral),
      maxLTV: formatRateNumber(maxLTV),
      // totalMaxLTV: divideBigNumber(borrowLimit, tatalCollateral), // 总最高抵押率
      totalLiquidation: divideBigNumber(liquidateThreashold, tatalCollateral), // 总清算域值
      totalCurrentLTV: divideBigNumber(totalBorrowed, tatalCollateral), // 总当前抵押率
      totalBorrowed: formatCurrencyNumber({
        big: totalBorrowed,
        decimal: activeCurrencyBaseInfo?.decimal
      }), // 总借款
      totalCollateral: formatCurrencyNumber({
        big: tatalCollateral,
        decimal: activeCurrencyBaseInfo?.decimal
      }) // 总抵押
    };
  }, [userStatus, activeCurrencyBaseInfo, type]);

  const balance = useMemo(() => {
    const {
      userBalance, // 用户余额
      // supplied, // 存款数量
      borrowLimit // 借款上限
    } = userStatus || {};
    const {
      depositAmount, // 存款余额
      borrowAmount // 借款数量
    } = activeCurrencyInfo;

    switch (type) {
      case DialogTypeProps.withdraw:
        return depositAmount;
      case DialogTypeProps.borrow:
        return (
          borrowLimit &&
          BN(
            formatCurrencyNumber({
              big: borrowLimit,
              decimal: activeCurrencyBaseInfo?.decimal
            })
          )
            .minus(borrowAmount)
            .toString()
        );
      default:
        return userBalance
          ? formatCurrencyNumber({
              big: userBalance,
              decimal: activeCurrencyBaseInfo?.decimal
            })
          : '';
    }
  }, [userStatus, type, activeCurrencyBaseInfo, activeCurrencyInfo]);

  const {
    optimization, // 内部撮合
    aave, // AAVE
    compound, // Compound
    borrowAPRPercent, // 借款APR百分数
    borrowAmount, // 借款数量
    depositAPRPercent, // 存款APR百分数
    depositAmount, // 存款余额
    maxLTV, // 当前币种最高抵押率
    totalCurrentLTV, // 总当前抵押率
    totalLiquidation, // 总清算域值
    assetPrice,
    totalBorrowed,
    totalCollateral,
    usingAsCollateral
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

  const handleFormChange = (obj: { [key: string]: any }) => {
    setFormValues({
      ...formValue,
      ...obj
    });
  };

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
          formValue.asCollateral === undefined &&
            handleFormChange({ asCollateral: data[1].usingAsCollateral });
        }
      }
    }
  });

  const getBestApr = (num?: string) => {
    if (num && optimization && aave && compound) {
      const max = BN.max(optimization, compound, aave).toString();
      const min = BN.min(optimization, compound, aave).toString();
      return [DialogTypeProps.deposit, DialogTypeProps.withdraw].includes(type)
        ? num === max
        : num === min;
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
    const list = [
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
    ];
    switch (type) {
      case DialogTypeProps.repay:
        return {
          aprTitle: '借款APR对比',
          list
        };
      case DialogTypeProps.borrow:
        return {
          aprTitle: '借款APR对比',
          list
        };
      default:
        return {
          aprTitle: '存款APR对比',
          list
        };
    }
  }, [type, activeCurrency, optimization, aave, compound]);

  const tabs = useMemo((): tabsItemProps[] => {
    switch (type) {
      case DialogTypeProps.repay:
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

  // 计算存款新的总的抵押率
  const depositWillTotalCurrentLTV = () => {
    // 原本是作为抵押物
    if (usingAsCollateral) {
      // 依然作为抵押物
      if (formValue.asCollateral) {
        return (
          (totalBorrowed &&
            totalCollateral &&
            divideString(
              totalBorrowed,
              BN(totalCollateral).plus(formValue.number).toString()
            )) ||
          '0'
        );
      } else {
        // 修改成不作为抵押物
        return (
          (totalBorrowed &&
            totalCollateral &&
            borrowAmount &&
            divideString(
              totalBorrowed,
              BN(totalCollateral).minus(borrowAmount).toString()
            )) ||
          '0'
        );
      }
    } else {
      // 原本不作为抵押物
      // 修改作为抵押物
      if (formValue.asCollateral) {
        return (
          (totalBorrowed &&
            totalCollateral &&
            borrowAmount &&
            divideString(
              totalBorrowed,
              BN(totalCollateral)
                .plus(borrowAmount)
                .plus(formValue.number)
                .toString()
            )) ||
          '0'
        );
      } else {
        // 依然不作为抵押物
        return totalCurrentLTV || '0';
      }
    }
  };

  const withdrawWillTotalCurrentLTV = () => {
    // 原本是作为抵押物
    if (usingAsCollateral) {
      return (
        (totalBorrowed &&
          totalCollateral &&
          depositAmount &&
          divideString(
            totalBorrowed,
            BN(totalCollateral)
              .minus(
                BN(formValue.number).isLessThanOrEqualTo(depositAmount)
                  ? formValue.number
                  : depositAmount
              )
              .toString()
          )) ||
        '0'
      );
    } else {
      // 原本不作为抵押物
      return totalCurrentLTV || '0';
    }
  };

  const borrowWillTotalCurrentLTV = () => {
    return (
      (totalBorrowed &&
        totalCollateral &&
        depositAmount &&
        divideString(
          BN(totalBorrowed).plus(formValue.number).toString(),
          totalCollateral
        )) ||
      '0'
    );
  };

  const repayWillTotalCurrentLTV = () => {
    return (
      (totalBorrowed &&
        totalCollateral &&
        borrowAmount &&
        divideString(
          BN(totalBorrowed)
            .minus(
              BN(formValue.number).isLessThanOrEqualTo(borrowAmount)
                ? formValue.number
                : borrowAmount
            )
            .toString(),
          totalCollateral
        )) ||
      '0'
    );
  };

  // 计算新抵押率
  const willTotalCurrentLTV = useMemo((): string => {
    if (formValue.number && BN(formValue.number).isGreaterThanOrEqualTo(0)) {
      switch (type) {
        case DialogTypeProps.deposit:
          return depositWillTotalCurrentLTV();
        case DialogTypeProps.borrow:
          return borrowWillTotalCurrentLTV();
        case DialogTypeProps.withdraw:
          return withdrawWillTotalCurrentLTV();
        case DialogTypeProps.repay:
          return repayWillTotalCurrentLTV();
        default:
          return '0';
      }
    }
    return '0';
  }, [
    formValue,
    activeCurrency,
    assetPrice,
    borrowAmount,
    totalCollateral,
    usingAsCollateral,
    type
  ]);

  // 是否超出清算域值
  const isOverLiquidation = useMemo(() => {
    return (
      (!!totalLiquidation &&
        !!totalCurrentLTV &&
        BN(totalLiquidation).isLessThan(totalCurrentLTV)) ||
      (!!willTotalCurrentLTV &&
        !!totalLiquidation &&
        BN(totalLiquidation).isLessThan(willTotalCurrentLTV))
    );
  }, [totalCurrentLTV, willTotalCurrentLTV]);

  // 当前币种最高抵押率百分比
  const maxLTVPercent = useMemo(() => {
    return toPercent(maxLTV);
  }, [maxLTV]);

  // 用户总当前抵押率百分比
  const totalCurrentLTVPercent = useMemo(() => {
    return toPercent(totalCurrentLTV);
  }, [totalCurrentLTV]);

  // 总清算域值百分比
  const totalLiquidationPercent = useMemo(() => {
    return toPercent(totalLiquidation);
  }, [totalLiquidation]);

  // 用户总将抵押率百分比
  const willTotalCurrentLTVPercent = useMemo(() => {
    return toPercent(willTotalCurrentLTV);
  }, [willTotalCurrentLTV]);

  // 是否是高风险
  const isHighRisk = useMemo(() => {
    return (
      !!willTotalCurrentLTV &&
      !!totalLiquidation &&
      BN(totalLiquidation).isLessThan(willTotalCurrentLTV)
    );
  }, [totalLiquidation, willTotalCurrentLTV]);

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

  const getFormError = () => {
    const { number } = formValue;
    if (balance && BN(balance).isLessThan(number)) {
      return {
        isError: true,
        errorMsg: '输入值大于最大可输入值'
      };
    }
    if (BN(number).isLessThanOrEqualTo(0)) {
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
              BN(number).isLessThanOrEqualTo(0)
          ),
          ...getFormError()
        };
      case DialogTypeProps.withdraw:
        return {
          disabled: Boolean(
            !number ||
              isOverLiquidation ||
              BN(number).isLessThanOrEqualTo(0) ||
              (balance && BN(balance).isLessThan(number))
          ),
          ...getFormError()
        };
      case DialogTypeProps.borrow:
        return {
          disabled: Boolean(
            !number ||
              isOverLiquidation ||
              BN(number).isLessThanOrEqualTo(0) ||
              (balance && BN(balance).isLessThan(number))
          ),
          ...getFormError()
        };
      case DialogTypeProps.repay:
        return {
          disabled: Boolean(
            !auth ||
              !number ||
              BN(number).isLessThanOrEqualTo(0) ||
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
    onRepay
  } = useTradeContract({
    activeCurrencyBaseInfo,
    formValue,
    activeCurrencyInfo,
    isHighRisk,
    willTotalCurrentLTVPercent,
    totalLiquidationPercent
  });

  return {
    tabs,
    open,
    setOpen,
    activeCurrency,
    infosTop,
    aprInfo,
    isOverLiquidation,
    maxLTVPercent,
    totalCurrentLTVPercent,
    totalLiquidationPercent,
    willTotalCurrentLTVPercent,
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
    formStatus
  };
};

export default useTradeDialog;
