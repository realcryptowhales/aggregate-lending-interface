import { readContracts } from '@wagmi/core';
import { useCallback, useState } from 'react';
import { erc20ABI } from 'wagmi';

export const useMultiCall = () => {
  const [multiCallData, setMultiCallData] = useState([]);

  const Erc20 = {
    address: '0x382bB369d343125BfB2117af9c149795C6C65C50' as `0x${string}`,
    abi: erc20ABI
  };
  const getMultiCallAction = useCallback(async () => {
    const res: any = await readContracts({
      contracts: [
        {
          ...Erc20,
          functionName: 'symbol'
        },
        {
          ...Erc20,
          functionName: 'balanceOf',
          args: ['0x49f8948c60cE2b4180DEf540f03148540268C5B0' as `0x${string}`]
        }
      ]
    });
    setMultiCallData(res);
  }, []);
  const startFetchMultiCall = useCallback(() => {
    getMultiCallAction();
    const timer = setInterval(() => {
      getMultiCallAction();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    startFetchMultiCall,
    multiCallData
  };
};
