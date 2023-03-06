import { useState, useEffect, useMemo, ReactNode } from 'react';
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite
} from 'wagmi';
import {
  DialogTypeProps,
  ContractsArgsProps,
  CurrencyBaseInfoProps
} from '@/constant/type';
import { utils, BigNumber } from 'ethers';
import BN from 'bignumber.js';
import { routerAddr, queryHelperContractAddr } from '@/constant/contract';
import { sTokenABI, routerABI, queryHelperABI } from '@/constant/abi';
import useCurrencyList from '@/hooks/useCurrencyList';
import { TRANSACTION_DETAIL_URL } from '../constant';

export interface CurrencyInfoProps {
  optimization?: string; // 内部撮合
  aave?: string; // AAVE
  compound?: string; // Compound
  borrowAPRPercent?: string; // 借款APR百分数
  borrowAmount?: string; // 借款数量
  depositAPRPercent?: string; // 存款APR百分数
  depositAmount?: string; // 存款余额
  maxLTV?: string; // 最高抵押率
  liquidation?: string; // 清算域值
  usedBorrowLimit?: string; // 已用借款限额
}

export interface UseTradeDialogProps {
  type: DialogTypeProps;
  activeCurrency: string;
  // currencyDetailList: CurrencyInfoProps[];
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
  number?: string;
  asCollateral: boolean;
}

export interface UseBalanceDataProps {
  decimals: number;
  formatted: string;
  symbol: string;
  value: number;
}

export interface TipDialogProps {
  content?: ReactNode;
  title?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  buttonText?: string;
  open: boolean;
}

export interface SnackbarProps {
  open: boolean;
  onClose?: () => void;
  message?: string;
  viewDetailUrl?: string;
  type?: 'error' | 'info' | 'success' | 'warning';
}

const useTradeDialog = ({ type, activeCurrency }: UseTradeDialogProps) => {
  const [activeCurrencyInfo, setActiveCurrencyInfo] =
    useState<CurrencyInfoProps>();
  const [activeCurrencyBaseInfo, setActiveCurrencyBaseInfo] =
    useState<CurrencyBaseInfoProps>();
  const [tabs, setTabs] = useState<tabsItemProps[]>();
  const [open, setOpen] = useState(true);
  const [infosTop, setInfosTop] = useState<InfosTopItemProps[]>();
  const [balance, setBalance] = useState<string>();
  const [dolors, setDolors] = useState<number>(0);
  const [aprInfo, setAprInfo] = useState<AprInfoProps>();
  const [willBecomeBorrowLimit, setWillBecomeBorrowLimit] = useState<string>();
  const [formValue, setFormValues] = useState<FormValuesProps>({
    number: '',
    asCollateral: true
  });
  const [auth, setAuth] = useState(true);
  const [allowance, setAllowance] = useState<number>(0);
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
    usedBorrowLimit // 已用借款限额
  } = activeCurrencyInfo || {};
  const [tipDialog, setTipDialog] = useState<TipDialogProps>({ open: false });
  const [snackbar, setSnackBar] = useState<SnackbarProps>({ open: false });

  const a = Math.pow(2, 256).toString();
  // console.log('num', BigNumber.from(a));

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

  const toPercent = (num?: string) => {
    return num ? `${BN(num).times(100)}%` : '0%';
  };

  const cutZero = (old: string) => {
    //拷贝一份 返回去掉零的新串
    let newStr = old;
    //循环变量 小数部分长度
    const leng = old.length - old.indexOf('.') - 1;
    //判断是否有效数
    if (old.indexOf('.') > -1) {
      //循环小数部分
      for (let i = leng; i > 0; i--) {
        //如果newstr末尾有0
        if (
          newStr.lastIndexOf('0') > -1 &&
          newStr.substr(newStr.length - 1, 1) === '0'
        ) {
          const k = newStr.lastIndexOf('0');
          //如果小数点后只有一个0 去掉小数点
          if (newStr.charAt(k - 1) == '.') {
            return newStr.substring(0, k - 1);
          } else {
            //否则 去掉一个0
            newStr = newStr.substring(0, k);
          }
        } else {
          //如果末尾没有0
          return newStr;
        }
      }
    }
    return old;
  };

  // bigNumber to percent
  const formatRatePercent = (big: BigNumber) => {
    return toPercent(BN(utils.formatUnits(big, 6)).toFixed(4, 1));
  };

  const formatRateNumber = (big: BigNumber) => {
    return cutZero(BN(utils.formatUnits(big, 6)).toFixed(4, 1));
  };

  const formatPriceNumber = (big: BigNumber) => {
    return cutZero(utils.formatUnits(big, 8));
  };

  // bigNumber to number
  const formatCurrencyNumber = (big: BigNumber) => {
    return cutZero(
      BN(utils.formatUnits(big, activeCurrencyBaseInfo?.decimal)).toFixed(4, 1)
    );
  };

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
    const depositAmount = formatCurrencyNumber(supplied); // 存款余额
    switch (type) {
      case DialogTypeProps.withdraw:
        setBalance(depositAmount);
        break;
      case DialogTypeProps.borrow:
        setBalance(formatCurrencyNumber(borrowLimit));
        break;
      default:
        setBalance(formatCurrencyNumber(userBalance));
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
      borrowAmount: formatCurrencyNumber(borrowed), // 借款数量
      depositAPRPercent: formatRatePercent(supplyRate), // 存款APR百分数
      depositAmount, // 存款余额
      maxLTV: formatRateNumber(borrowLimit.mod(tatalCollateral)), // 最高抵押率
      liquidation: formatRateNumber(liquidateThreashold.mod(tatalCollateral)), // 清算域值
      usedBorrowLimit: formatRateNumber(borrowed.mod(tatalCollateral)) // 已用借款限额
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
            Number(utils.formatUnits(data[0], activeCurrencyBaseInfo?.decimal))
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

  // 授权当前币种额度
  const approveConfig = usePrepareContractWrite({
    address: activeCurrencyBaseInfo?.address,
    abi: sTokenABI,
    functionName: 'approve',
    // args: [routerAddr, formValue.number ? utils.parseUnits(formValue.number.toString(), activeCurrencyBaseInfo?.decimal) : '0'],
    args: [
      routerAddr,
      formValue.number
        ? utils.parseUnits(
            formValue.number.toString(),
            activeCurrencyBaseInfo?.decimal
          )
        : '0'
    ]
  });
  const onApprove = useContractWrite(approveConfig.config);

  // 处理授权结果
  useEffect(() => {
    const { isError, error, isSuccess, data } = onApprove;
    const { message } = error || {};
    console.log(data);
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });

      // setTipDialog({
      //   open: true,
      //   title: '交易已拒绝',
      //   content: '你已在钱包内拒绝授权，请再次尝试',
      //   onClose: () => {
      //     setTipDialog({ open: false });
      //   },
      //   onConfirm: () => {
      //     setTipDialog({ open: false });
      //     write?.();
      //   },
      //   buttonText: '再次尝试',
      // });
    } else if (isSuccess) {
      const { hash } = data;
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        type: 'success'
      });
    }
  }, [onApprove.status]);

  // 存款
  const depositConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'supply',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: formValue.number
          ? utils.parseUnits(
              formValue.number.toString(),
              activeCurrencyBaseInfo?.decimal
            )
          : '0',
        to: address
      },
      formValue.asCollateral,
      true
    ]
  });
  const onDeposit = useContractWrite(depositConfig.config);

  // 处理存款结果
  useEffect(() => {
    const { isError, error, isSuccess, data } = onApprove;
    const { message } = error || {};
    console.log(data);
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });

      // setTipDialog({
      //   open: true,
      //   title: '交易已拒绝',
      //   content: '你已在钱包内拒绝授权，请再次尝试',
      //   onClose: () => {
      //     setTipDialog({ open: false });
      //   },
      //   onConfirm: () => {
      //     setTipDialog({ open: false });
      //     write?.();
      //   },
      //   buttonText: '再次尝试',
      // });
    } else if (isSuccess) {
      const { hash } = data;
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        type: 'success'
      });
    }
  }, [onDeposit.status]);

  // 取款
  const withdrawConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'redeem',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: formValue.number
          ? utils.parseUnits(
              formValue.number.toString(),
              activeCurrencyBaseInfo?.decimal
            )
          : '0',
        to: address
      },
      formValue.asCollateral,
      true
    ]
  });
  const onWithdraw = useContractWrite(withdrawConfig.config);

  // 处理取款结果
  useEffect(() => {
    const { isError, error, isSuccess, data } = onWithdraw;
    const { message } = error || {};
    console.log(data);
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });

      // setTipDialog({
      //   open: true,
      //   title: '交易已拒绝',
      //   content: '你已在钱包内拒绝授权，请再次尝试',
      //   onClose: () => {
      //     setTipDialog({ open: false });
      //   },
      //   onConfirm: () => {
      //     setTipDialog({ open: false });
      //     write?.();
      //   },
      //   buttonText: '再次尝试',
      // });
    } else if (isSuccess) {
      const { hash } = data;
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        type: 'success'
      });
    }
  }, [onWithdraw.status]);

  // 借款
  const borrowConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'borrow',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: formValue.number
          ? utils.parseUnits(
              formValue.number.toString(),
              activeCurrencyBaseInfo?.decimal
            )
          : '0',
        to: address
      },
      true
    ]
  });
  const onBorrow = useContractWrite(borrowConfig.config);

  // 处理借款结果
  useEffect(() => {
    const { isError, error, isSuccess, data } = onBorrow;
    const { message } = error || {};
    console.log(data);
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });

      // setTipDialog({
      //   open: true,
      //   title: '交易已拒绝',
      //   content: '你已在钱包内拒绝授权，请再次尝试',
      //   onClose: () => {
      //     setTipDialog({ open: false });
      //   },
      //   onConfirm: () => {
      //     setTipDialog({ open: false });
      //     write?.();
      //   },
      //   buttonText: '再次尝试',
      // });
    } else if (isSuccess) {
      const { hash } = data;
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        type: 'success'
      });
    }
  }, [onBorrow.status]);

  // 还款
  const repayConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'borrow',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: formValue.number
          ? utils.parseUnits(
              formValue.number.toString(),
              activeCurrencyBaseInfo?.decimal
            )
          : '0',
        to: address
      },
      true
    ]
  });
  const onRepay = useContractWrite(repayConfig.config);

  // 处理还款结果
  useEffect(() => {
    const { isError, error, isSuccess, data } = onRepay;
    const { message } = error || {};
    console.log(data);
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });

      // setTipDialog({
      //   open: true,
      //   title: '交易已拒绝',
      //   content: '你已在钱包内拒绝授权，请再次尝试',
      //   onClose: () => {
      //     setTipDialog({ open: false });
      //   },
      //   onConfirm: () => {
      //     setTipDialog({ open: false });
      //     write?.();
      //   },
      //   buttonText: '再次尝试',
      // });
    } else if (isSuccess) {
      const { hash } = data;
      setSnackBar({
        open: true,
        message: `授权${activeCurrency}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        type: 'success'
      });
    }
  }, [onRepay.status]);

  // 更新auth状态
  useEffect(() => {
    if (formValue.number) {
      console.log('allowance', allowance);
      // setAuth(formValue.number <= allowance);
    } else {
      setAuth(true);
    }
  }, [allowance, formValue]);

  // 更新借款限额 和 美元价值
  useEffect(() => {
    formValue?.number && setDolors(Number(formValue.number));
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
