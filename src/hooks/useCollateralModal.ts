import { configContractAddr, configABI, mockUSDTAddr } from '@/constant';
import { useCallback, useMemo, useState } from 'react';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
export enum Action {
  openCollateral = 'openCollateral',
  closeCollateral = 'closeCollateral'
}
export const useCollateralModal = () => {
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
  console.log('config', config);
  const { isLoading, isSuccess, write } = useContractWrite({
    mode: '',
    ...config
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
  console.log('isSuccess', isSuccess);
  const onCancel = useCallback(() => {
    setModalVisible(false);
  }, []);
  const onConfirm = useCallback(() => {
    console.log('isLoading', isLoading, write);
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
