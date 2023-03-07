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
import { constants } from 'ethers';
import { routerAddr } from '@/constant/contract';
import { sTokenABI, routerABI } from '@/constant/abi';
import { TRANSACTION_DETAIL_URL } from '../constant';
import { parseUnits } from '../utils';

const useTradeContract = ({
  activeCurrencyBaseInfo,
  formValue,
  activeCurrencyInfo
}: UseTradeContractProps) => {
  const [tipDialog, setTipDialog] = useState<TipDialogProps>({ open: false });
  const [snackbar, setSnackBar] = useState<SnackbarProps>({ open: false });

  // 获取用户钱包地址
  const { address } = useAccount();

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
      formValue.number !== '0' &&
      activeCurrencyBaseInfo?.address &&
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
        buttonText: '再次尝试'
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
        buttonText: `将ib${activeCurrencyBaseInfo?.symbol}添加进钱包`
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
      formValue.number !== '0' &&
      activeCurrencyBaseInfo?.address &&
      address
  });
  const onWithdraw = useContractWrite(withdrawConfig.config);

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
        buttonText: '再次尝试'
      });
    } else if (isSuccess) {
      const { hash } = data;
      setTipDialog({
        open: true,
        title: '交易已提交',
        content: `${activeCurrencyBaseInfo?.symbol} 取款交易已提交上链，请等待交易结果`,
        onClose: () => {
          setSnackBar({ open: false });
        },
        viewDetailUrl: `${TRANSACTION_DETAIL_URL}/${hash}`,
        onConfirm: () => {
          setTipDialog({ open: false });
        },
        buttonText: '关闭'
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
      formValue.number !== '0' &&
      activeCurrencyBaseInfo?.address &&
      address
  });
  const onBorrow = useContractWrite(borrowConfig.config);

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
        buttonText: '再次尝试'
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
        buttonText: '关闭'
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
      formValue.number !== '0' &&
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
        buttonText: '再次尝试'
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
        buttonText: '关闭'
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
      isLoading: onWithdraw.isLoading || waitForWithdrawTransaction.isLoading
    },
    onBorrow: {
      ...onBorrow,
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
