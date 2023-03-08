import { useState, useEffect } from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi';
import {
  TipDialogProps,
  SnackbarProps,
  UseTradeContractProps
} from '@/constant/type';
import BN from 'bignumber.js';
import { constants } from 'ethers';
import { routerAddr } from '@/constant/contract';
import { sTokenABI, routerABI } from '@/constant/abi';
import { TRANSACTION_DETAIL_URL } from '../constant';
import { parseUnits } from '../utils';

const useTradeContract = ({
  activeCurrencyBaseInfo,
  formValue,
  activeCurrencyInfo,
  isHighRisk,
  willBecomeBorrowLimitPercent,
  liquidationPercent,
  willBecomeLTVPercent
}: UseTradeContractProps) => {
  const [tipDialog, setTipDialog] = useState<TipDialogProps>({ open: false });
  const [snackbar, setSnackBar] = useState<SnackbarProps>({ open: false });

  // 获取用户钱包地址
  const { address } = useAccount();

  // 高风险二次确认弹窗
  const highRiskConfirmDialog = ({
    content,
    onCancel,
    open
  }: TipDialogProps) => {
    setTipDialog({
      open,
      title: '风险提示',
      content,
      onClose: () => {
        setTipDialog({ open: false });
      },
      onConfirm: () => {
        setTipDialog({ open: false });
      },
      confirmButtonText: '取消',
      cancelButtonText: '继续',
      onCancel
    });
  };

  const addToken = async () => {
    try {
      const { sToken, symbol, decimal, icon } = activeCurrencyBaseInfo || {};
      const res = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: sToken,
            symbol: symbol,
            decimals: decimal,
            image: icon
          }
        }
      });
      if (res) {
        setSnackBar({
          open: true,
          message: `添加ib${activeCurrencyBaseInfo?.symbol}成功`,
          onClose: () => {
            setSnackBar({ open: false });
          },
          type: 'success'
        });
      } else {
        setSnackBar({
          open: true,
          message: `添加ib${activeCurrencyBaseInfo?.symbol}失败`,
          onClose: () => {
            setSnackBar({ open: false });
          },
          type: 'error'
        });
      }
    } catch (err) {
      setSnackBar({
        open: true,
        message: `添加ib${activeCurrencyBaseInfo?.symbol}失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });
    }
  };

  // 授权当前币种额度
  const approveConfig = usePrepareContractWrite({
    address: activeCurrencyBaseInfo?.address,
    abi: sTokenABI,
    functionName: 'approve',
    args: [routerAddr, constants.MaxUint256],
    enabled: !!routerAddr
  });
  const onApprove = useContractWrite(approveConfig.config);

  // 处理授权结果
  useEffect(() => {
    const { isError, error } = onApprove;
    const { message } = error || {};
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrencyBaseInfo?.symbol}交易被拒绝`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        type: 'error'
      });
    }
  }, [onApprove.status]);

  const waitForApproveTransaction = useWaitForTransaction({
    hash: onApprove.data?.hash,
    onSuccess(data: any) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrencyBaseInfo?.symbol}交易已提交`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onApprove.data?.hash}`,
        type: 'success'
      });
    },
    onError(error: any) {
      setSnackBar({
        open: true,
        message: `授权${activeCurrencyBaseInfo?.symbol}失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onApprove.data?.hash}`,
        type: 'error'
      });
    }
  });

  // 存款
  const depositConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'supply',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: parseUnits({
          num: formValue.number,
          decimal: activeCurrencyBaseInfo?.decimal
        }),
        to: address
      },
      formValue.asCollateral,
      true
    ],
    enabled:
      formValue.number &&
      BN(formValue.number).isGreaterThanOrEqualTo(0) &&
      activeCurrencyBaseInfo?.address &&
      formValue.asCollateral !== undefined &&
      address
  });
  const onDeposit = useContractWrite(depositConfig.config);

  // 处理存款结果
  useEffect(() => {
    const { isError, error, isSuccess, write, data } = onDeposit;
    const { message } = error || {};
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setTipDialog({
        open: true,
        title: '交易已拒绝',
        content: `你已在钱包内拒绝存款 ${formValue.number} ${activeCurrencyBaseInfo?.symbol} 请再次尝试`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
          write?.();
        },
        confirmButtonText: '再次尝试'
      });
    } else if (isSuccess) {
      setTipDialog({
        open: true,
        title: '交易已提交',
        content: `${activeCurrencyBaseInfo?.symbol} 存款交易已提交上链，请等待交易结果`,
        viewDetailUrl: data.hash,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
          addToken();
        },
        confirmButtonText: `将ib${activeCurrencyBaseInfo?.symbol}添加进钱包`
      });
    }
  }, [onDeposit.status]);

  const waitForDepositTransaction = useWaitForTransaction({
    hash: onDeposit.data?.hash,
    onSuccess(data: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}存款成功`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onDeposit.data?.hash}`,
        type: 'success'
      });
    },
    onError(error: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}存款失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onDeposit.data?.hash}`,
        type: 'error'
      });
    }
  });

  // 取款
  const withdrawConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'redeem',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: parseUnits({
          num: formValue.number,
          decimal: activeCurrencyBaseInfo?.decimal
        }),
        to: address
      },
      activeCurrencyInfo?.usingAsCollateral,
      true
    ],
    enabled:
      formValue.number &&
      BN(formValue.number).isGreaterThanOrEqualTo(0) &&
      activeCurrencyBaseInfo?.address &&
      address
  });
  const onWithdraw = useContractWrite(withdrawConfig.config);

  // 高风险取款
  const onHighRiskWithdraw = () => {
    highRiskConfirmDialog({
      open: true,
      content: `取款后仓位质押率为${willBecomeLTVPercent}，清算阈值为${liquidationPercent} 清算风险较高，请合理规划取款。`,
      onCancel: () => {
        setTipDialog({ open: false });
        onWithdraw?.write?.();
      }
    });
  };

  // 处理取款结果
  useEffect(() => {
    const { isError, error, isSuccess, data, write } = onWithdraw;
    const { message } = error || {};
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setTipDialog({
        open: true,
        title: '交易已拒绝',
        content: `你已在钱包内拒绝取款 ${formValue.number}${activeCurrencyBaseInfo?.symbol} 请再次尝试`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
          write?.();
        },
        confirmButtonText: '再次尝试'
      });
    } else if (isSuccess) {
      const { hash } = data;
      setTipDialog({
        open: true,
        title: '交易已提交',
        content: `${activeCurrencyBaseInfo?.symbol} 取款交易已提交上链，请等待交易结果`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        onConfirm: () => {
          setTipDialog({ open: false });
        },
        confirmButtonText: '关闭'
      });
    }
  }, [onWithdraw.status]);

  const waitForWithdrawTransaction = useWaitForTransaction({
    hash: onWithdraw.data?.hash,
    onSuccess(data: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}取款成功`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onWithdraw.data?.hash}`,
        type: 'success'
      });
    },
    onError(error: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}取款失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onWithdraw.data?.hash}`,
        type: 'error'
      });
    }
  });

  // 借款
  const borrowConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'borrow',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: parseUnits({
          num: formValue.number,
          decimal: activeCurrencyBaseInfo?.decimal
        }),
        to: address
      },
      true
    ],
    enabled:
      formValue.number &&
      BN(formValue.number).isGreaterThanOrEqualTo(0) &&
      activeCurrencyBaseInfo?.address &&
      address
  });
  const onBorrow = useContractWrite(borrowConfig.config);

  // 高风险借款
  const onHighRiskBorrow = () => {
    highRiskConfirmDialog({
      open: true,
      content: `借款后已用借款限额为${willBecomeBorrowLimitPercent}，清算阀值为${liquidationPercent}，清算风险较高，请合理规划借款额或归还部分贷款。`,
      onCancel: () => {
        setTipDialog({ open: false });
        onBorrow?.write?.();
      }
    });
  };

  // 处理借款结果
  useEffect(() => {
    const { isError, error, isSuccess, data, write } = onBorrow;
    const { message } = error || {};
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setTipDialog({
        open: true,
        title: '交易已拒绝',
        content: `你已在钱包内拒绝借款${formValue.number} ${activeCurrencyBaseInfo?.symbol} 请再次尝试`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
          write?.();
        },
        confirmButtonText: '再次尝试'
      });
    } else if (isSuccess) {
      setTipDialog({
        open: true,
        title: '交易已提交',
        content: `${activeCurrencyBaseInfo?.symbol} 借款交易已提交上链，请等待交易结果`,
        viewDetailUrl: data.hash,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
        },
        confirmButtonText: '关闭'
      });
    }
  }, [onBorrow.status]);

  const waitForBorrowTransaction = useWaitForTransaction({
    hash: onBorrow.data?.hash,
    onSuccess(data: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}借款成功`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onBorrow.data?.hash}`,
        type: 'success'
      });
    },
    onError(error: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}借款失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onBorrow.data?.hash}`,
        type: 'error'
      });
    }
  });

  // 还款
  const repayConfig = usePrepareContractWrite({
    address: routerAddr,
    abi: routerABI,
    functionName: 'repay',
    args: [
      {
        asset: activeCurrencyBaseInfo?.address,
        amount: parseUnits({
          num: formValue.number,
          decimal: activeCurrencyBaseInfo?.decimal
        }),
        to: address
      },
      true
    ],
    enabled:
      formValue.number &&
      BN(formValue.number).isGreaterThanOrEqualTo(0) &&
      activeCurrencyBaseInfo?.address &&
      address
  });
  const onRepay = useContractWrite(repayConfig.config);

  // 处理还款结果
  useEffect(() => {
    const { isError, error, isSuccess, data, write } = onRepay;
    const { message } = error || {};
    if (isError && message && message.indexOf('User rejected request') > -1) {
      setTipDialog({
        open: true,
        title: '交易已拒绝',
        content: `你已在钱包内拒绝还款${formValue.number} ${activeCurrencyBaseInfo?.symbol} 请再次尝试`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
          write?.();
        },
        confirmButtonText: '再次尝试'
      });
    } else if (isSuccess) {
      const { hash } = data;
      setTipDialog({
        open: true,
        title: '交易已提交',
        content: `${activeCurrencyBaseInfo?.symbol} 还款交易已提交上链，请等待交易结果`,
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        onClose: () => {
          setTipDialog({ open: false });
        },
        onConfirm: () => {
          setTipDialog({ open: false });
        },
        confirmButtonText: '关闭'
      });
    }
  }, [onRepay.status]);

  const waitForRepayTransaction = useWaitForTransaction({
    hash: onRepay.data?.hash,
    onSuccess(data: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}还款成功`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onRepay.data?.hash}`,
        type: 'success'
      });
    },
    onError(error: any) {
      setSnackBar({
        open: true,
        message: `${formValue.number} ${activeCurrencyBaseInfo?.symbol}还款失败`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${onRepay.data?.hash}`,
        type: 'error'
      });
    }
  });

  return {
    onApprove: {
      ...onApprove,
      isLoading: onApprove.isLoading || waitForApproveTransaction.isLoading
    },
    onDeposit: {
      ...onDeposit,
      isLoading: onDeposit.isLoading || waitForDepositTransaction.isLoading
    },
    onWithdraw: {
      ...onWithdraw,
      write: isHighRisk ? onHighRiskWithdraw : onWithdraw.write,
      isLoading: onWithdraw.isLoading || waitForWithdrawTransaction.isLoading
    },
    onBorrow: {
      ...onBorrow,
      write: isHighRisk ? onHighRiskBorrow : onBorrow.write,
      isLoading: onBorrow.isLoading || waitForBorrowTransaction.isLoading
    },
    onRepay: {
      ...onRepay,
      isLoading: onRepay.isLoading || waitForRepayTransaction.isLoading
    },
    snackbar,
    tipDialog
  };
};

export default useTradeContract;
