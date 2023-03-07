import { configContractAddr, configABI, mockUSDTAddr } from '@/constant';
import { useCallback, useMemo, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
export enum Action {
  openCollateral = 'openCollateral',
  closeCollateral = 'closeCollateral'
}
export const useCollateralModal = (
  successCall: () => void,
  errorCall: () => void
) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [collateralStatus, setCollateralStatus] = useState<Action>(
    Action.closeCollateral
  );
  const [tokenAddr, setTokenAddr] = useState(mockUSDTAddr);
  const [tokenSymbol, setTokenSymbol] = useState('');
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: configContractAddr,
    abi: configABI,
    functionName: 'setUsingAsCollateral',
    args: [
      address,
      tokenAddr,
      collateralStatus === Action.closeCollateral ? false : true
    ],
    chainId: 66,
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(error) {
      console.log('Error', error);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    }
  });
  const { isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.log('Success', data);
      successCall();
    },
    onError(error) {
      console.log('error', error);
      errorCall();
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    }
  });
  const openModalAction = useCallback(
    (symbol: string, tokenAddress: string, action: string) => {
      setTokenSymbol(symbol);
      setTokenAddr(tokenAddress);
      setCollateralStatus(action as any);
      setModalVisible(true);
    },
    []
  );
  const onCancel = useCallback(() => {
    setModalVisible(false);
  }, []);
  const onConfirm = useCallback(() => {
    write?.();
  }, [write, isLoading]);
  return {
    tokenSymbol,
    onCancel,
    onConfirm,
    openModalAction,
    collateralStatus,
    modalVisible
  };
};
